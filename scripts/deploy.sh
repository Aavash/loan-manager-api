#!/bin/sh
set -e

# ENV=prod ENV=dev docker-compose -f docker-compose.minio.yml up -d
ENV=prod docker-compose -f postgres.yml up -d

ENV=prod docker-compose down || echo "Unable to remove network"

if [[ $* == *--build* ]]
then
  ENV=prod docker-compose up -d --build
else
  ENV=prod docker-compose up -d
fi

if [[ $* == *--migrate* ]]
then
  docker exec api-service run typeorm migration:run
fi