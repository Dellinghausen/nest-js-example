run-migration:  
	yarn typeorm migration:run

up:
	docker-compose up -d

down:
	docker-compose kill
	docker-compose rm -f

logs:
	docker-compose logs -f
	
restart:
	sudo systemctl restart docker