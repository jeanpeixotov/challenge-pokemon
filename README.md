Api Pokemon
=========

This API to list, create or buy pokemons.


## Technologies

* Gulp for compile task
* Docker
* Knex (Database Code First)
* Node
* Typescript
* Postgres (Knex + Objection.js) 

### Use
* localhost:3000
* list pokemons: /get-pokemons
* create pokemon: /create-pokemon { name: string, price: integer, stock: integer (default 1)}
* buy pokemon: /buy-pokemon { name: string, quantity: integer}

## For Dev

```bash
#run
docker-compose up
```

![codando](https://media.giphy.com/media/ZvLUtG6BZkBi0/giphy.gif)
