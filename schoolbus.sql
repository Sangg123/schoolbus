-- ==========================================
-- TABLE: USER (Abstract User)
-- ==========================================
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "full_name" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(20) UNIQUE,
  "role" VARCHAR(10) NOT NULL CHECK ("role" IN ('admin', 'driver', 'parent'))
);
COMMENT ON COLUMN "User"."role" IS 'User role: admin, driver, parent';

-- ==========================================
-- TABLE: ADMIN (Details)
-- ==========================================
CREATE TABLE "Admin" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

-- ==========================================
-- TABLE: DRIVER (Details)
-- ==========================================
CREATE TABLE "Driver" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "citizen_id" VARCHAR(50) UNIQUE NOT NULL,
  "license_id" VARCHAR(50) UNIQUE NOT NULL
);
COMMENT ON COLUMN "Driver"."citizen_id" IS 'National ID / Identity card';
COMMENT ON COLUMN "Driver"."license_id" IS 'Driver license number';

-- ==========================================
-- TABLE: PARENT (Details)
-- ==========================================
CREATE TABLE "Parent" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "citizen_id" VARCHAR(50) UNIQUE NOT NULL
);
COMMENT ON COLUMN "Parent"."citizen_id" IS 'National ID / Identity card';

-- ==========================================
-- TABLE: STUDENT
-- ==========================================
CREATE TABLE "Student" (
  "id" SERIAL PRIMARY KEY,
  "full_name" VARCHAR(255) NOT NULL,
  "class" VARCHAR(50),
  "student_code" VARCHAR(50) UNIQUE NOT NULL
);
COMMENT ON COLUMN "Student"."student_code" IS 'Unique student code';

-- ==========================================
-- TABLE: PARENT - STUDENT (M-N)
-- ==========================================
CREATE TABLE "ParentStudent" (
  "parent_id" INT NOT NULL REFERENCES "Parent"("id") ON DELETE CASCADE,
  "student_id" INT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  PRIMARY KEY ("parent_id", "student_id")
);

-- ==========================================
-- TABLE: BUS
-- ==========================================
CREATE TABLE "Bus" (
  "id" SERIAL PRIMARY KEY,
  "license_plate" VARCHAR(20) UNIQUE NOT NULL,
  "capacity" INT,
  "current_lat" DECIMAL(10, 8),
  "current_lng" DECIMAL(11, 8),
  "last_updated" TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON COLUMN "Bus"."last_updated" IS 'Timestamp of last location update';

-- ==========================================
-- TABLE: ROUTE
-- ==========================================
CREATE TABLE "Route" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL,
  "description" TEXT
);

-- ==========================================
-- TABLE: STOP POINT
-- ==========================================
CREATE TABLE "StopPoint" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "address" TEXT,
  "latitude" DECIMAL(10, 8) NOT NULL,
  "longitude" DECIMAL(11, 8) NOT NULL
);

-- ==========================================
-- TABLE: ITINERARY (Route + Stops)
-- ==========================================
CREATE TABLE "Itinerary" (
  "id" SERIAL PRIMARY KEY,
  "route_id" INT NOT NULL REFERENCES "Route"("id") ON DELETE CASCADE,
  "stop_id" INT NOT NULL REFERENCES "StopPoint"("id") ON DELETE CASCADE,
  "stop_order" INT NOT NULL,
  "estimated_time" TIME,
  UNIQUE ("route_id", "stop_order")
);
COMMENT ON COLUMN "Itinerary"."stop_order" IS 'Stop sequence on route (1, 2, 3...)';
COMMENT ON COLUMN "Itinerary"."estimated_time" IS 'Estimated arrival time at stop';

-- ==========================================
-- TABLE: SCHEDULE (Weekly Recurring)
-- ==========================================
CREATE TABLE "Schedule" (
  "id" SERIAL PRIMARY KEY,
  "route_id" INT NOT NULL REFERENCES "Route"("id"),
  "bus_id" INT NOT NULL REFERENCES "Bus"("id"),
  "driver_id" INT NOT NULL REFERENCES "Driver"("id"),
  "day_of_week" INT NOT NULL CHECK ("day_of_week" BETWEEN 0 AND 6), -- 0=Mon, 1=Tue, ..., 6=Sun
  "trip_type" VARCHAR(10) NOT NULL CHECK ("trip_type" IN ('pickup', 'dropoff')),
  "start_time" TIME NOT NULL,
  UNIQUE ("route_id", "day_of_week", "trip_type")
);
COMMENT ON COLUMN "Schedule"."day_of_week" IS 'Day of week (0=Monday, 1=Tuesday, ..., 6=Sunday)';

-- ==========================================
-- TABLE: STUDENT ASSIGNMENT TO SCHEDULE
-- ==========================================
CREATE TABLE "StudentSchedule" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "schedule_id" INT NOT NULL REFERENCES "Schedule"("id") ON DELETE CASCADE,
  "pickup_stop_id" INT REFERENCES "StopPoint"("id"),
  "dropoff_stop_id" INT REFERENCES "StopPoint"("id"),
  UNIQUE ("student_id", "schedule_id")
);
COMMENT ON COLUMN "StudentSchedule"."pickup_stop_id" IS 'Pickup stop for student in this schedule';
COMMENT ON COLUMN "StudentSchedule"."dropoff_stop_id" IS 'Drop-off stop for student in this schedule';

-- ==========================================
-- LOGIC: SNAPSHOT MECHANISM
-- ==========================================
-- When a new Trip is created (daily or when Schedule updates), the system performs:
-- 1. Query by schedule_id to JOIN Driver, Bus, Route, Itinerary, and StudentSchedule (students with pickup/dropoff points).
-- 2. Freeze all related data into a JSON structure and store it in Trip.initial_snapshot.
-- 3. When the trip ends (status = 'completed'), summarize attendance data and store it in Trip.final_snapshot.

-- ==========================================
-- TABLE: TRIP (Specific Day with History Snapshots)
-- ==========================================
CREATE TABLE "Trip" (
  "id" SERIAL PRIMARY KEY,
  "schedule_id" INT NOT NULL REFERENCES "Schedule"("id"),
  "trip_date" DATE NOT NULL,

  "current_status" VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK ("current_status" IN ('pending', 'in_progress', 'completed', 'cancelled')),
  "initial_status_time" TIMESTAMPTZ DEFAULT NOW(),
  "final_status_time" TIMESTAMPTZ NULL,
  "actual_start_time" TIMESTAMPTZ NULL,
  "actual_end_time" TIMESTAMPTZ NULL,

  -- SNAPSHOT FIELDS (DENORMALIZATION)
  "initial_snapshot" jsonb, 
  "final_snapshot" jsonb, 
  
  UNIQUE ("schedule_id", "trip_date")
);
COMMENT ON COLUMN "Trip"."current_status" IS 'Current status of the trip';
COMMENT ON COLUMN "Trip"."initial_snapshot" IS 'Frozen snapshot of Schedule/Bus/Driver/Route/Student list at trip creation time (0h)';
COMMENT ON COLUMN "Trip"."final_snapshot" IS 'Final summary snapshot when trip ends (e.g. attendance, duration, alerts)';

-- ==========================================
-- TABLE: ATTENDANCE
-- ==========================================
CREATE TABLE "Attendance" (
  "id" SERIAL PRIMARY KEY,
  "trip_id" INT NOT NULL REFERENCES "Trip"("id"),
  "student_id" INT NOT NULL REFERENCES "Student"("id"),
  "stop_id" INT NOT NULL REFERENCES "StopPoint"("id"),
  "action" VARCHAR(20) NOT NULL CHECK ("action" IN ('picked_up', 'dropped_off', 'absent')),
  "timestamp" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE ("trip_id", "student_id")
);
COMMENT ON COLUMN "Attendance"."action" IS 'Attendance action: picked_up, dropped_off, absent';

-- ==========================================
-- TABLE: NOTIFICATION
-- ==========================================
CREATE TABLE "Notification" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INT NULL REFERENCES "User"("id") ON DELETE SET NULL, 
  "receiver_id" INT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE, 
  "content" TEXT NOT NULL,
  "type" VARCHAR(20) NOT NULL CHECK ("type" IN ('warning', 'info', 'delay', 'arrival')),
  "is_read" BOOLEAN DEFAULT FALSE,
  "sent_time" TIMESTAMPTZ DEFAULT NOW()
);
