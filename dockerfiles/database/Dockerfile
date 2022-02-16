FROM postgres:12-alpine

COPY create_dbs.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/create_dbs.sh

EXPOSE 5432

