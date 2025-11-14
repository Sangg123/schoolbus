#!/bin/bash

# Set base directory to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POSTGRES_HOME="$SCRIPT_DIR/external-tools/postgres/postgresql-18.0-2-windows-x64-binaries/pgsql"
DATADIR="$POSTGRES_HOME/data"

cd "$POSTGRES_HOME"

# Initialize data directory if not exists
if [ ! -d "$DATADIR" ]; then
    echo "Initializing PostgreSQL data directory..."
    bin/initdb -D "$DATADIR" -U postgres --encoding=UTF8 --locale=en_US.UTF-8
fi

# Function to create database if not exists
create_database() {
    echo "Waiting for PostgreSQL to start..."
    
    # Wait for PostgreSQL to be ready
    for i in {1..30}; do
        if bin/pg_isready -U postgres > /dev/null 2>&1; then
            echo "PostgreSQL is ready. Checking/creating database..."
            
            # Check if database exists
            DB_EXISTS=$(bin/psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'schoolbus'" | grep -c 1)
            
            if [ "$DB_EXISTS" -eq 0 ]; then
                echo "Creating database schoolbus..."
                bin/psql -U postgres -c "CREATE DATABASE schoolbus ENCODING 'UTF8';"
            else
                echo "Database schoolbus already exists."
            fi
            return 0
        fi
        sleep 1
    done
    
    echo "Warning: PostgreSQL did not start in time"
    return 1
}

# Run database creation in background
create_database &

# Run PostgreSQL in foreground (Ctrl+C will stop it)
echo "Starting PostgreSQL server in foreground (Ctrl+C to stop)..."
bin/postgres -D "$DATADIR"