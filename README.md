# PetStore 🚀

PetStore is a awesome product manager made with **Node.js**, **Express**, **ReactJS** and **Ant Design** 🐜!

![Sign In Screen](https://raw.githubusercontent.com/dbarjs/petstore/master/docs/assets/sign-page.png)
![Dashboard Screen](https://raw.githubusercontent.com/dbarjs/petstore/master/docs/assets/dashboard-page.png)

## Installation

This project uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage the package architecture, soyou can install the PetStore and simple run `yarn start` to start server and web client, like this:

```bash
git clone https://github.com/dbarjs/petstore
cd petstore
yarn
yarn start
```

### Start server develpoment mode

```bash
yarn dev:server
```

### Start web client develpoment mode

```bash
yarn web
```

### Build web client for production

```bash
yarn workspace @petstore/web build
```

### Test server

```bash
yarn workspace @petstore/server test
```

## Migrations

Create a PostgreSQL database with name `petstore` (or `petstore_tests` for tests), then run the [TypeORM](https://typeorm.io/) migration command line:

```bash
yarn typeorm migration:run
```

You can use the revert the migration using:

```bash
yarn typeorm migration:revert
```

### Seeds

This project uses the [TypeORM](https://github.com/w3tecch/typeorm-seeding) and [Faker.js](https://github.com/Marak/faker.js) libs to produce fake products to test the database, for this, just run:

```bash
yarn workspace @petstore/server seed:run --connection seed
```

## API

On this project, you can use the [Insomnia config file](https://github.com/dbarjs/petstore/blob/master/insomnia.json) to import an configured env to test your routes :)

### Create User: `[POST]: /users`

```bash
curl --request POST \
  --url http://localhost:3333/users \
  --header 'content-type: application/json' \
  --data '{
	"name": "Test User",
	"email": "test@gmail.com",
	"password": "123456"
}'
```

### Create Session Token: `[POST]: /sessions`

```bash
curl --request POST \
  --url http://localhost:3333/sessions \
  --header 'content-type: application/json' \
  --data '{
	"email": "test@gmail.com",
	"password": "123456"
}'
```

### Create Product: `[POST]: /products`

```bash
curl --request POST \
  --url http://localhost:3333/products \
  --header 'authorization: Bearer <token>' \
  --header 'content-type: application/json' \
  --data '{
	"name": "Product name",
	"description": "Some description",
	"category": "Category",
	"price": 9.99,
	"quantity": 99
}'
```

### List Products: `[GET]: /products`

```bash
curl --request GET \
  --url 'https://684e3e5a235f.ngrok.io/products?q=&name=&category=&description=&page=1&per_page=10' \
  --header 'authorization: Bearer <sessionToken>'
```

### Update Product: `[PUT]: /products/:id`

```bash
curl --request PUT \
  --url http://localhost:3333/products/:id \
  --header 'authorization: Bearer <sessionToken>' \
  --header 'content-type: application/json' \
  --data '{
	"name": "New name",
	"description": "Other description",
	"category": "New category",
	"price": 3.5,
	"quantity": 90
}'
```

### Delete Product: `[DELETE]: /products/:id`

```bash
curl --request DELETE \
  --url http://localhost:3333/products/:id \
  --header 'authorization: Bearer <sessionToken>'
```

## Logs

All user requests (including errors) are recorded in a file called `request.log` inside the folder `server/tmp`.


## Options

You can change the following server environment variables: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`.
As this project supports the [dotenv](https://www.npmjs.com/package/dotenv) lib, then you can change the variables by adding a `.env` file to the root.
Or you can set the variables by command line, like this:

```bash
DB_HOST=localhost yarn dev:serve
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/dbarjs/petstore/blob/master/LICENSE)
