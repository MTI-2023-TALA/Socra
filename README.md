# Socra

School project made by 4 student at EPITA:

- Alois Heloir
- Alan Schaeffer
- Theo Casner
- Loup Dallier

## How to install

First of all, to install the dependencies

```
npm ci
```

Then, to enable an empty database

```
docker-compose up -d mongo
```

The first time the database is created, it will be seed with 10 different parcours.

## Run the program

```
npm run start
```

## Testing

In order to test, there's two things to do. First, enable the test database

```
docker-compose up -d mongo-test
```

Then, you can execute the tests

```
npm run test
```

**_Note that all the tests are run by the CI on push_**

## How to use

### General routes

The application contains many routes:

- /parcours with GET, PATCH and POST, that respectively retrieve all the parcours, change the description of a parcours and add a new parcours

When wanting to PATCH, the body must respect the following format:

```json
{
  "description": "Some wonderful text"
}
```

When wanting to POST, the body must respect the following format:

```json
{
    "title": "A title",
    "campus": "A city",
    "durationInMonths": 24,
    "type": "Master",
    "price": 12000,
    "onSitePercentage": 50,
    "beginDate": "2023-02-25",
    "modules": [
      {
        "title": "A module title",
        "description": "And it's description"
      },
      {
        "titre": "Another module title",
        "description": "And another description"
      }
    ],
    "description": "The description of the parcours"
  },
```

- /parcours/{id} that get a specific parcours. Note that if the id doesn't exist, an 404 Error will be raised

- /parcours/cheaper/{price} that get all the parcours where the price is lesser than or equal to the price given in the query

- /parcours/city/{city} that get a parcours located in the given city. Note that the search is case insensitive.

- /search explain just underneath

### Keyword search

In order to use the keyword search functionnality, you need to:

- GET on /search
- The body must respect the following format:

```json
[
    "keyword1",
    ... ,
    "keywordN",
]
```

This will retrieve all the parcours, sorted after a given formula. Note that the parcours in which none of the keyword are found will not be retrieved.

## For the dev

If you're ask to continue this project, here's a few tips for you.

- The architecture of the project is a basic architecture. You can add route in the parcours.route.ts file, and add every function in the interface so that the testing is easier.

- For the keyword search part, the class is self-sufficient, you can easily change it and it will affect the search part.

- When pushing, the CI will run all the tests to ensure that there is no regression, as well as a lint verification and a build. We can only advise you to install a pre-commit hook (husky for example) to check that even before the push.
