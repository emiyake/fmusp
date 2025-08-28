This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test:e2e`

Launches the test runner.<br />
App must be running at port 4000.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs biome lint verification. It doesn't fix any lint errors.
You can run `npm run lint:fix` to automatically fix any fixable errors by biome.


## Updating GraphQL Schemas

If you're using GraphQL and needs to add or update a query/mutation follow these instructions:
- Ensure the `const GRAPHQL_ENDPOINT` on `scripts/codegen.js` is set properly
- Add/update a `.graphql` file on `src/app/data/graphql`
- run `$ npm run apollo:codegen`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Form Field default value

There is an object used to pick the default value based on FormField children element.

The object consist in a Record of Inputs displayName and valid default value.

If needed, DefaultValues object in form-field.component.tsx can be edited to include new or different value.