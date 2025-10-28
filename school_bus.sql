-- ==========================================
-- DATABASE: school_bus
-- ==========================================
CREATE DATABASE IF NOT EXISTS school_bus
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_bus;

-- ==========================================
-- TABLE: USER (Admin, Driver, Parent)
-- ==========================================
CREATE TABLE Users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  FullName VARCHAR(255) NOT NULL,
  PhoneNumber VARCHAR(20) UNIQUE,
  Role ENUM('admin', 'driver', 'parent') NOT NULL
);

-- ==========================================
-- TABLE: STUDENT
-- ==========================================
CREATE TABLE Student (
  StudentID INT AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(255) NOT NULL,
  Class VARCHAR(50),
  StudentCode VARCHAR(50) UNIQUE
);

-- ==========================================
-- TABLE: PARENT - STUDENT (Many-to-Many)
-- ==========================================
CREATE TABLE Parent_Student (
  ParentID INT NOT NULL,
  StudentID INT NOT NULL,
  PRIMARY KEY (ParentID, StudentID),
  FOREIGN KEY (ParentID) REFERENCES Users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID) ON DELETE CASCADE
);

-- ==========================================
-- TABLE: BUS
-- ==========================================
CREATE TABLE Bus (
  BusID INT AUTO_INCREMENT PRIMARY KEY,
  LicensePlate VARCHAR(20) UNIQUE NOT NULL,
  Capacity INT,
  CurrentLatitude DECIMAL(10, 8),
  CurrentLongitude DECIMAL(11, 8),
  LastUpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABLE: ROUTE
-- ==========================================
CREATE TABLE Route (
  RouteID INT AUTO_INCREMENT PRIMARY KEY,
  RouteName VARCHAR(255) NOT NULL,
  Description TEXT
);

-- ==========================================
-- TABLE: STOP POINT
-- ==========================================
CREATE TABLE StopPoint (
  StopID INT AUTO_INCREMENT PRIMARY KEY,
  StopName VARCHAR(255) NOT NULL,
  Address TEXT,
  Latitude DECIMAL(10, 8) NOT NULL,
  Longitude DECIMAL(11, 8) NOT NULL
);

-- ==========================================
-- TABLE: ITINERARY (Route + Stops)
-- ==========================================
CREATE TABLE Itinerary (
  ItineraryID INT AUTO_INCREMENT PRIMARY KEY,
  RouteID INT NOT NULL,
  StopID INT NOT NULL,
  StopOrder INT NOT NULL,
  EstimatedTime TIME,
  UNIQUE (RouteID, StopOrder),
  FOREIGN KEY (RouteID) REFERENCES Route(RouteID) ON DELETE CASCADE,
  FOREIGN KEY (StopID) REFERENCES StopPoint(StopID) ON DELETE CASCADE
);

-- ==========================================
-- TABLE: SCHEDULE (Weekly)
-- ==========================================
CREATE TABLE Schedule (
  ScheduleID INT AUTO_INCREMENT PRIMARY KEY,
  RouteID INT NOT NULL,
  BusID INT NOT NULL,
  DriverID INT NOT NULL,
  DayOfWeek INT NOT NULL, -- 2=Monday ... 8=Sunday
  TripType ENUM('pickup', 'dropoff') NOT NULL,
  StartTime TIME NOT NULL,
  UNIQUE (RouteID, DayOfWeek, TripType),
  FOREIGN KEY (RouteID) REFERENCES Route(RouteID),
  FOREIGN KEY (BusID) REFERENCES Bus(BusID),
  FOREIGN KEY (DriverID) REFERENCES Users(UserID)
);

-- ==========================================
-- TABLE: STUDENT ASSIGNMENT TO SCHEDULE
-- ==========================================
CREATE TABLE Student_Schedule (
  AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
  StudentID INT NOT NULL,
  ScheduleID INT NOT NULL,
  PickupStopID INT,
  DropoffStopID INT,
  UNIQUE (StudentID, ScheduleID),
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID) ON DELETE CASCADE,
  FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID) ON DELETE CASCADE,
  FOREIGN KEY (PickupStopID) REFERENCES StopPoint(StopID),
  FOREIGN KEY (DropoffStopID) REFERENCES StopPoint(StopID)
);

-- ==========================================
-- TABLE: TRIP (Specific Day)
-- ==========================================
CREATE TABLE Trip (
  TripID INT AUTO_INCREMENT PRIMARY KEY,
  ScheduleID INT NOT NULL,
  TripDate DATE NOT NULL,
  Status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  ActualStartTime TIMESTAMP NULL,
  ActualEndTime TIMESTAMP NULL,
  UNIQUE (ScheduleID, TripDate),
  FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID)
);

-- ==========================================
-- TABLE: ATTENDANCE
-- ==========================================
CREATE TABLE Attendance (
  AttendanceID INT AUTO_INCREMENT PRIMARY KEY,
  TripID INT NOT NULL,
  StudentID INT NOT NULL,
  StopID INT NOT NULL,
  Action ENUM('pickup', 'dropoff', 'absent') NOT NULL,
  Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (TripID) REFERENCES Trip(TripID),
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
  FOREIGN KEY (StopID) REFERENCES StopPoint(StopID)
);

-- ==========================================
-- TABLE: NOTIFICATION
-- ==========================================
CREATE TABLE Notification (
  NotificationID INT AUTO_INCREMENT PRIMARY KEY,
  SenderID INT NULL,         -- Can be driver or admin
  ReceiverID INT NOT NULL,   -- Can be parent or driver
  Content TEXT NOT NULL,
  Type ENUM('warning', 'info', 'delay', 'arrival') NOT NULL,
  IsRead BOOLEAN DEFAULT FALSE,
  SentTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (SenderID) REFERENCES Users(UserID)
      ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
      ON DELETE CASCADE ON UPDATE CASCADE
);
