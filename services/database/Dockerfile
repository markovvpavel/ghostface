FROM alpine

# Install dependencies
RUN apk add --no-cache bash curl postgresql-client

# Copy scripts
COPY ./scripts /scripts
COPY ./cronfile /etc/cron.d/cronfile

RUN chmod +x /scripts/*.sh
RUN chmod 0644 /etc/cron.d/cronfile

RUN crontab /etc/cron.d/cronfile

CMD ["bash", "-c", "/scripts/upload-backup.sh; crond -f"]