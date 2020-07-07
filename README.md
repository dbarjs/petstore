# Foobar

PetStore is a awesome product manager made with Node.js, ReactJS and Ant Design🚀!

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

## Options

You can set the database server host setting the environment variable `DB_HOST`

```bash
DB_HOST=localhost yarn dev:serve
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
