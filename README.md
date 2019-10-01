# mock_premier_league_app
# Software Developer Application Test

Create a API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”

Link: https://mock-premier-league-app.herokuapp.com/
Api endpoints link: https://www.getpostman.com/collections/444a946154c1c2c4162d

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

## Tests

Unit tests are a must, submissions without tests will be ignored.
