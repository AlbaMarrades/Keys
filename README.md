# KEYS

This project was generated with Angular CLI version 13.2.2

Official documentation: https://angular.io

## Authors and acknowledgment
@antero3
@amanda50
@hugomdmg
@JonayCastro
@Miriam_Moncho
@xgost
@jesica2

## License
ISC License


# Development

---

## Developed dependencies
Docker version 20.10.12 or higher

## Install Docker and Docker-Compose
Install Docker: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-es

Install Docker-Compose: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-es

### Running the application for the first time (building the docker image)

You only need to run the following command in the project folder's root:
`docker-compose up --build`

### Start up the local aplication
`docker-compose up` or `make start-all`

### Stop the aplication
`docker-compose down`or `make down`


# Tests

We use Jest for testing.

Official documentation: https://jestjs.io/

###

To run **unit test** of **app and api** you don't need to start the application, just execute the following command:
`make unit-all`

> This command executes all the test commands explained below

### Running unit tests

If you only want to run the unitary component tests don't need to start the application, only execute:

- To **app unit-test**:
`docker-compose run --rm app npm run test` or `make unit-app`

- To **api unit-test**:
`docker-compose run --rm api npm run test`or `make unit-api`

> If you need to pass arguments you must execute `make unit-app ARGS="write_here"` and `make unit-api ARGS="write_here"`

- To **all tests**:
`make unit-all`


# Tests e2e

To run e2e tests, we use Cypress.

Official documentation: https://www.cypress.io/

- Command: `./End2End/cypress-tests-runner.sh` or `make e2e`

