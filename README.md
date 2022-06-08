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

To enable the database you can use

```
docker-compose up -d mongo
```

To run the test,
You need to have the mongo test database

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
