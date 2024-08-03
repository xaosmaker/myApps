build:
	docker compose -f local.yml up --build -d --remove-orphans

up:
	docker compose -f local.yml up -d

down:
	docker compose -f local.yml down

down-v:
	docker compose -f local.yml down -v

show-logs:
	docker compose -f local.yml logs

makemigrations:
	docker-compose -f local.yml run --rm myapps_api python manage.py makemigrations

migrate:
	docker-compose -f local.yml run --rm myapps_api python manage.py migrate

pytest:
	docker-compose -f local.yml run --rm myapps_api pytest
config:
	docker-compose -f local.yml config

create-superuser:
	docker-compose -f local.yml run --rm myapps_api python manage.py createsuperuser

incpect_db:
	docker-compose -f local.yml exec myapps_postgres_db psql --username=xaosmaker --dbname=myapps

api-shell:
	docker exec -it myapps_api /bin/sh
