# bank-challenge
Repository created to perform a technical challenge

## Setup Project

### Requirements

* Docker

### Clone repository

To clone the repository we must use

```
git clone https://github.com/gonzalormonja/bank-challenge.git
```

### Run project

To run the project it will be sufficient to execute

```
docker compose up
```

### Test

If you want to run the unit tests you can run

```
npm run test
```

### See information

Without closing the console that is running docker we must connect to the mongodb database using the following connection string (this value is by default according to the configuration of docker-compose.yml)
```
mongosh mongodb://127.0.0.1:27017/bank-challenge
```