#!/bin/sh
set -e

cd /usr/src/app
npm run build
npm run start:prod