#!/bin/bash

set -o errexit

set -o pipefail

set -o nounset

python manage.py migrate --no-input
python manage.py collectstatic --no-input

NUM_WORKERS=${GUNICORN_WORKERS:-3}


exec /py/bin/gunicorn config.wsgi --bind 0.0.0.0:8000 --chdir=/app --workers $NUM_WORKERS
