# Dockerfile
FROM postgres:17-alpinedo

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Set locale (optional)
ENV LANG en_US.utf8