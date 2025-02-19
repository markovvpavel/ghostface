#!/bin/sh

BACKUP_DIR="/backups"
BACKUP_NAME="backup_$(date +%Y%m%d%H%M%S).sql"
MAX_BACKUPS=3

export PGPASSWORD=$POSTGRES_PASSWORD

# Create a backup of the PostgreSQL database
echo "Creating backup: $BACKUP_NAME"
pg_dump -U $POSTGRES_USER -d $POSTGRES_DB -h database -p 5432 >$BACKUP_DIR/$BACKUP_NAME

# Delete old backups, keeping only the latest 7
echo "Deleting old backups, keeping only the latest $MAX_BACKUPS."
ls -t $BACKUP_DIR | tail -n +$((MAX_BACKUPS + 1)) | xargs -I {} rm -f $BACKUP_DIR/{}

echo "Backup completed and old backups cleaned."
