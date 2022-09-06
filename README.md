# Frontend
Frontend to visualize and filter new orders and communities.

# Requirements
You need nodejs v14.20.0
## Configuration
You must define the base URL for API requests as the `BASE_URL` environment variable (or in the `.env` file) before running. If you fail to do so and you are **NOT** in a production environment, a mock API will be used instead, a sample env file will be found on `.env-sample`.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
