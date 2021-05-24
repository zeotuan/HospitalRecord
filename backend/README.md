# Hospital Record API

This is a REST API for the Hospital Record application

## ✔️ Requirements

Node (versions `14.15.5` are tested, but later versions _might_ work as well) and npm. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Npm is also handy if you want to quickly switch between different Node versions.

## 🚀 Getting started

1.  cd in the `backend` directory and run `npm install` .

2. Create a file `.env` in the `backend` directory and copy the contents of the `.sample_env` file there. then you can fill the .env variable with your own.

3. **(Optional)** To populate the database with some seed data you can run `npm run seed`. **Note:** running this command will remove all existing data that you have in your database.

4. All done! Just run `npm start` to start the server. After the server has started you should be able to access the GraphQL playground at http://localhost:3001/api.


## 🔑 Authorization
You can register a new user by usinng the user endpoint: http://localhost:3001/api/login

### Authorize requests
in order the authorize your request you must first obtain an access token through the login endpoint above
then you can add to your header of your request: 

```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```

Replace the `<ACCESS_TOKEN>` part with your access token.
