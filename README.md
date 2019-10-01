# mock_premier_league_app

Create a API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”

Live App Link: https://mock-premier-league-app.herokuapp.com/

API Endpoints Documentation: https://documenter.getpostman.com/view/6357029/SVn3tvmK

## User Types

There should be:

- **Admin accounts** which are used to
  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture
- **Users accounts** who can
  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures
  - robustly search fixtures/teams
- Only the search API should be availble to the public.

## Authentication and Session Management
1. Use redis as your session store.
3. Authentication and Authorization for admin and user accounts should be done using `Bearer token` and `JWT`.

## Tools/Stack

- NodeJs (JavaScript or TypeScript)
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express
- Heroku

## Tests

Unit tests are a must, submissions without tests will be ignored.
