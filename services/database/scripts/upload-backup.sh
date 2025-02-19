#!/bin/sh

# Path to the backups
BACKUP_DIR=/backups

# Find the latest backup file (assuming backups have a date or timestamp in their filename)
LATEST_BACKUP=$(ls -t $BACKUP_DIR | head -n 1)

export PGPASSWORD=$POSTGRES_PASSWORD

# If a backup file is found, restore it to the database container
if [ -n "$LATEST_BACKUP" ]; then
    echo "Restoring backup: $LATEST_BACKUP"

    # Use psql to restore the plain-text SQL dump
    psql -U $POSTGRES_USER -d $POSTGRES_DB -h database -p 5432 -f /backups/$LATEST_BACKUP
else
    echo "No backup found to restore."
fi
