build:
	docker-compose -f local.yml up --build -d --remove-orphans

config:
	docker-compose -f local.yml config

up:
	docker-compose -f local.yml up -d

down:
	docker-compose -f local.yml down

down-v:
	docker-compose -f local.yml down -v

show-logs:
	docker-compose -f local.yml logs

test:
	docker-compose -f local.yml run --rm myapp_server python manage.py test 

pytest:
	docker-compose -f local.yml run --rm myapp_server  pytest 
migrate:
	docker-compose -f local.yml run --rm myapp_server python manage.py migrate 

makemigration:
	docker-compose -f local.yml run --rm myapp_server python manage.py makemigrations
