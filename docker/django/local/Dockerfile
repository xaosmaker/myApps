FROM python:3.12.4-alpine3.20

COPY ./requirements /tmp/requirements/
COPY . /app


WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ARG GID
ARG UID

RUN python -m venv /py && \
  /py/bin/pip install --upgrade pip && \
  apk add build-base libpq libpq-dev &&\
  /py/bin/pip install -r /tmp/requirements/local.txt && \
  rm -rf /tmp && \
  addgroup -g ${GID} django && \
  adduser \
  --disabled-password \
  --no-create-home \
  -G django\
  -u ${UID} django && \
  chown -R django:django /app && \
  chmod -R 755 /app



USER django


ENV PATH="/py/bin:$PATH"
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]



