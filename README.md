# Socra

School project made by 4 student at EPITA:

- Alois Heloir
- Alan Schaeffer
- Theo Casner
- Loup Dallier

## How to install

Install the dependencies

```
npm ci
```

To enable the database with already data in it, you can use

```
docker-compose up -d mongo-seed
```

Otherwise, to enable an empty database you can use

```
docker-compose up -d mongo
```

To run tests, you need to have the mongo test database

```
docker-compose up -d mongo-test
```

## Run the program

```
npm run start
```

## Testing

```
npm run test
```

## How to use

In order to use the keyword search functionnality, you need to:

- GET on localhost:3000/search
- The body must respect the following format:

```
[
    "keyword1",
    ... ,
    "keywordN",
]
```
