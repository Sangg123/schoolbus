// src/components/mapTracking.jsx
import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";

import getAllParent from "../api/getAllParent";
import getAllParentStudent from "../api/getAllParentStudent";
import getAllStudentSchedule from "../api/getAllStudentSchedule";
import getAllSchedule from "../api/getAllSchedule";
import getAllItinerary from "../api/getAllItinerary";
import getAllStopPoint from "../api/getAllStopPoints";
import getBusById from "../api/getBusById";
import getAllLocationEvent from "../api/getAllLocationEvent";
// -----------------------------------------

const containerStyle = { width: "100%", height: "600px" };
const DEFAULT_CENTER = { lat: 10.7598, lng: 106.6629 }; // ví dụ: ĐH Sài Gòn

export default function TrackingMap({ pollMs = 5000 }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // data per student: { studentId, scheduleId, routeId, busId, tripId }
  const [studentTrips, setStudentTrips] = useState([]); 
  const [busPositions, setBusPositions] = useState({}); // { [busId]: {lat,lng,lastUpdated} }
  const [routePaths, setRoutePaths] = useState({}); // { [routeId]: [{lat,lng,...}] }
  const pollingRef = useRef(null);

  // helper: convert JS Date.getDay() (0 Sun .. 6 Sat) -> your schedule day code (1=Mon..6=Sat)
  const getTodayDayCode = () => {
    const d = new Date().getDay();
    if (d === 0) return 7; // if you have Sun=7 (adjust if not)
    return d; // 1..6
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser =
        JSON.parse(localStorage.getItem("userInfo"))?.user || null;
        const userId = currentUser?.id;
        if (!userId) {
          throw new Error("Không tìm thấy userId trong localStorage");
        }

        // 1) parent
        const parents = await getAllParent(); // trả về array
        const parent = parents.find((p) => Number(p.userId) === Number(userId));
        if (!parent) {
          throw new Error("Không tìm thấy parent ứng với user hiện tại");
        }
        const parentId = parent.id;

        // 2) parent-student => danh sách studentId
        const psList = await getAllParentStudent();
        const myPS = psList.filter((ps) => Number(ps.parentId) === Number(parentId));
        if (!myPS.length) {
          // không có con
          if (mounted) {
            setStudentTrips([]);
            setLoading(false);
          }
          return;
        }
        const studentIds = myPS.map((ps) => ps.studentId);

        // 3) load all student-schedule, schedule (we'll load all and then filter)
        const studentSchedules = await getAllStudentSchedule(); // all records
        const schedules = await getAllSchedule(); // all schedules

        // prepare result list
        const todayDay = getTodayDayCode();

        const trips = []; // will fill { studentId, scheduleId, routeId, busId, tripId? }

        for (const sid of studentIds) {
          // get student-schedules for this student
          const sss = studentSchedules.filter((ss) => Number(ss.studentId) === Number(sid));
          if (!sss.length) continue;

          // For each student-schedule, find matching schedule and check dayOfWeek
          // choose the schedule that matches today's dayOfWeek (or choose first)
          let matched = null;
          for (const ss of sss) {
            const sched = schedules.find((s) => Number(s.id) === Number(ss.scheduleId));
            if (!sched) continue;
            // assume schedule.dayOfWeek uses 1=Mon..6=Sat as your earlier code
            if (Number(sched.dayOfWeek) === Number(todayDay)) {
              matched = { studentSchedule: ss, schedule: sched };
              break;
            }
          }
          // fallback: if none match today, take first one (optional)
          if (!matched) {
            const ss = sss[0];
            const sched = schedules.find((s) => Number(s.id) === Number(ss.scheduleId));
            if (sched) matched = { studentSchedule: ss, schedule: sched };
          }

          if (!matched) continue;

          trips.push({
            studentId: sid,
            scheduleId: matched.schedule.id,
            routeId: matched.schedule.routeId,
            busId: matched.schedule.busId,
            // if you track tripId separately, you can extend here
          });
        }

        if (mounted) {
          setStudentTrips(trips);
        }

        // 4) Preload route paths for all distinct routeId
        const routeIds = [...new Set(trips.map((t) => Number(t.routeId)).filter(Boolean))];
        if (routeIds.length) {
          const allItinerary = await getAllItinerary();
          const allStopPoints = await getAllStopPoint();

          const newRoutePaths = {};
          for (const rid of routeIds) {
            const its = allItinerary
              .filter((it) => Number(it.routeId) === Number(rid))
              .sort((a, b) => Number(a.stopOrder) - Number(b.stopOrder));
            const stops = its
              .map((it) => {
                const sp = allStopPoints.find((s) => Number(s.id) === Number(it.stopId));
                if (!sp) return null;
                return { lat: Number(sp.latitude), lng: Number(sp.longitude), name: sp.name, address: sp.address };
              })
              .filter(Boolean);
            newRoutePaths[rid] = stops;
          }
          if (mounted) setRoutePaths(newRoutePaths);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError(err.message || "Lỗi khi tải dữ liệu");
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []); // run once on mount

  // polling for bus positions
  useEffect(() => {
    // clear previous
    if (pollingRef.current) clearInterval(pollingRef.current);

    const busIds = [...new Set(studentTrips.map((t) => Number(t.busId)).filter(Boolean))];
    if (!busIds.length) return;

    const fetchPositions = async () => {
      try {
        const newPositions = { ...busPositions };
        for (const bid of busIds) {
          try {
            const bus = await getBusById(bid);
            if (bus) {
              // use bus.currentLat/currentLng if available
              if (bus.currentLat != null && bus.currentLng != null) {
                newPositions[bid] = {
                  lat: Number(bus.currentLat),
                  lng: Number(bus.currentLng),
                  lastUpdated: bus.lastUpdated || new Date().toISOString(),
                  licensePlate: bus.licensePlate,
                };
              } else {
                // fallback: try location-event latest for this bus
                const events = await getAllLocationEvent(); // all events
                const busEvents = events
                  .filter((ev) => Number(ev.busId) === Number(bid))
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                if (busEvents.length) {
                  const ev = busEvents[0];
                  newPositions[bid] = {
                    lat: Number(ev.latitude),
                    lng: Number(ev.longitude),
                    lastUpdated: ev.timestamp,
                    licensePlate: bus.licensePlate,
                  };
                }
              }
            }
          } catch (err) {
            console.warn("Không lấy được bus", bid, err);
          }
        }
        setBusPositions(newPositions);
      } catch (err) {
        console.error("Lỗi khi lấy vị trí bus:", err);
      }
    };

    // initial fetch immediately
    fetchPositions();

    pollingRef.current = setInterval(fetchPositions, pollMs);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentTrips]); // re-run when studentTrips change

  // compute map center: prioritize first bus position, else first stop of first route, else default
  const computeCenter = () => {
    const busIds = Object.keys(busPositions);
    if (busIds.length) {
      const b = busPositions[busIds[0]];
      if (b && b.lat && b.lng) return { lat: b.lat, lng: b.lng };
    }
    const routeIds = Object.keys(routePaths);
    if (routeIds.length) {
      const rp = routePaths[routeIds[0]];
      if (rp && rp.length) return { lat: rp[0].lat, lng: rp[0].lng };
    }
    return DEFAULT_CENTER;
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ color: "red" }}>Lỗi: {error}</div>;

  // render: for mỗi student -> render bus marker (if busId), and render route polyline (unique routes only)
  const uniqueRouteIds = [...new Set(studentTrips.map((t) => Number(t.routeId)).filter(Boolean))];
  const uniqueBusIds = [...new Set(studentTrips.map((t) => Number(t.busId)).filter(Boolean))];

  return (
    <div style={{ width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={computeCenter()}
        zoom={14}
      >
        {/* Polylines for each route */}
        {uniqueRouteIds.map((rid) => {
          const stops = routePaths[rid] || [];
          if (!stops.length) return null;
          const path = stops.map((s) => ({ lat: s.lat, lng: s.lng }));
          return (
            <Polyline
              key={`route-${rid}`}
              path={path}
              options={{
                strokeWeight: 4,
                clickable: false,
              }}
            />
          );
        })}

        {/* stop markers */}
        {uniqueRouteIds.flatMap((rid) => (routePaths[rid] || []).map((s, idx) => ({ rid, s, idx })))
          .map(({ rid, s, idx }) => (
            <Marker
              key={`stop-${rid}-${idx}`}
              position={{ lat: s.lat, lng: s.lng }}
              label={`${idx + 1}`}
              title={`${s.name || "Stop"} (${s.address || ""})`}
            />
          ))}

        {/* bus markers */}
        {uniqueBusIds.map((bid) => {
          const pos = busPositions[bid];
          if (!pos) return null;
          return (
            <Marker
              key={`bus-${bid}`}
              position={{ lat: pos.lat, lng: pos.lng }}
              title={`Bus ${pos.licensePlate || bid} - updated ${pos.lastUpdated}`}
              icon={{
                url: "/bus-icon.png",
                scaledSize: new window.google.maps.Size(36, 36),
              }}
            />
          );
        })}
      </GoogleMap>

      {/* summary panel */}
      <div style={{ marginTop: 8 }}>
        <h4>Thông tin theo dõi</h4>
        {studentTrips.length === 0 && <div>Bạn chưa đăng ký học sinh hoặc không có lịch hôm nay.</div>}
        {studentTrips.map((t, i) => (
          <div key={i} style={{ padding: 6, borderBottom: "1px solid #eee" }}>
            <strong>Student ID:</strong> {t.studentId} <br />
            <strong>Schedule ID:</strong> {t.scheduleId} <br />
            <strong>Route ID:</strong> {t.routeId} <br />
            <strong>Bus ID:</strong> {t.busId} <br />
            <strong>Position:</strong>{" "}
            {t.busId && busPositions[t.busId]
              ? `${busPositions[t.busId].lat.toFixed(6)}, ${busPositions[t.busId].lng.toFixed(6)}`
              : "Chưa có vị trí"}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
