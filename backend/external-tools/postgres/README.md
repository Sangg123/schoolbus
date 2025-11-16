# 🛠️ On-Demand PostgreSQL Setup (No Docker, No Service)

This guide explains how to run PostgreSQL locally using precompiled binaries and a batch script. No installation or Docker is required.

---

## 📁 Folder Structure

Place the PostgreSQL binaries inside:

```
external-tools/postgres/postgresql-18.0-2-windows-x64-binaries/pgsql
```

This folder is **not committed to Git** — you must download and extract it manually.

---

## ▶️ Running PostgreSQL

Use the provided `start-postgres.bat` script from your project root:

```bash
start-postgres.bat
```

- Initializes the data directory on first run
- Starts PostgreSQL in the foreground
- Logs are written to `logfile.txt` inside the PostgreSQL folder
- To stop PostgreSQL, close the command prompt window

---

## ⚙️ Optional: Create Database

```sql
CREATE DATABASE schoolbus ENCODING 'UTF8';
```

---

## 🧩 Connection Parameters

Use the following settings in your application:

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: (set manually or via script)
- Database: `schoolbus`

---

## 📝 Notes

- PostgreSQL runs as a foreground process. To stop it, close the command prompt window.
- You can customize the script to run additional SQL setup commands after startup.
