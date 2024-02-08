build-all: 
	docker-compose build

build-app: 
	docker-compose build app

build-api: 
	docker-compose build api

start-all:
	docker-compose up  

start-app:
	docker-compose up app 

start-api:
	docker-compose up api 

unit-app:
	docker-compose run --rm app npm run test $(ARGS)

unit-one:
	docker-compose run --rm app npm run test -- --include **/$(ARGS).spec.ts

unit-api:
	docker-compose run --rm api npm run test $(ARGS) -- --runInBand

unit-all:
	docker-compose run --rm app npm run test
	docker-compose run --rm api npm run test -- --runInBand
	
down:
	docker-compose down

bash-app:
	docker-compose run --rm app bash

bash-api:
	docker-compose run --rm api bash

e2e:
	./End2End/cypress-tests-runner.sh