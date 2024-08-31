FROM docker.io/python:3.12.4-alpine3.20 as python

FROM python as python-build-stage
ARG BUILD_ENVIRONMENT=local

COPY ./requirements .

RUN apk update --no-cache && apk upgrade --no-cache \
  && pip wheel --wheel-dir /usr/src/app/wheels \
  -r ${BUILD_ENVIRONMENT}.txt


FROM python AS python-run-stage
ARG GID=1000
ARG UID=1000
ARG BUILD_ENVIRONMENT=local
ARG APP_HOME=/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV BUILD_ENV ${BUILD_ENVIRONMENT}


WORKDIR ${APP_HOME}




RUN apk update --no-cache && apk upgrade --no-cache \
  &&  apk add --no-cache openssh vim bash-completion  

RUN addgroup --system --gid ${GID} django && \ 
  adduser --system --uid ${UID} --disabled-password  --ingroup django django && \
  mkdir -p ${APP_HOME}/static && \
  chown -R django:django ${APP_HOME}/static && \
  chmod -R 775 ${APP_HOME}/static


RUN apk update --no-cache && apk upgrade --no-cache \
  &&  apk add --no-cache  build-base libpq libpq-dev  

COPY --from=python-build-stage /usr/src/app/wheels /wheels/

RUN  python -m venv /py \
  && /py/bin/pip install --upgrade setuptools \
  && /py/bin/pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/


COPY --chown=django:django ./docker/local/django/entrypoint.sh /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint


COPY --chown=django:django ./docker/local/django/start.sh /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start





COPY --chown=django:django ./docker/local/django/celery/worker/start.sh /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker
RUN chmod +x /start-celeryworker


COPY --chown=django:django ./docker/local/django/celery/beat/start.sh /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat
RUN chmod +x /start-celerybeat


COPY --chown=django:django ./docker/local/django/celery/flower/start.sh /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower






COPY --chown=django:django . ${APP_HOME}
RUN chown -R django:django ${APP_HOME}

USER django

ENV PATH="/py/bin:$PATH"


ENTRYPOINT [ "/entrypoint" ]
