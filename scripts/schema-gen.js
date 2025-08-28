const task = require('./task');
const dotenv = require('dotenv');
const fs = require('node:fs');
const os = require('node:os');

dotenv.config({ path: process.env.ENV_FILE ?? '.env' });

const BASE_URL = process.env.VITE_BASE_URL;
const graphqlPath = './src/app/data/graphql';
const generatedPath = `${graphqlPath}/generated`;
const indexPath = `${generatedPath}/index.ts`;

const cleanSchema = task.newTask('Clean schema', `npx rimraf ${graphqlPath}/schema.json`);
const cleanGeneratedFolder = task.newTask('Clean generated folder', `npx rimraf ${generatedPath}`);
const downloadSchema = task.newTask(
  'Donwload schema',
  `npx get-graphql-schema ${BASE_URL} > ${graphqlPath}/schema.json --json`,
);
const generateSchema = task.newTask('Generating schema', 'npx graphql-codegen --config codegen.yml');
const lintFiles = task.newTask(
  'Lint files',
  `biome check --write --unsafe ${graphqlPath}/base-schema.ts ${graphqlPath}/**/*.ts`,
);

const writeIndexFile = () => {
  const paths = fs.readdirSync(generatedPath).filter(path => !path.includes('index'));

  fs.writeFileSync(indexPath, '');
  paths.forEach(path => {
    fs.appendFileSync(indexPath, `export * from './${path.replace('.ts', '')}';${os.EOL}`);
  });
};

(async () => {
  await task.exec(cleanSchema);
  await task.exec(cleanGeneratedFolder);
  await task.exec(downloadSchema);
  await task.exec(generateSchema);
  await task.exec(lintFiles);
  writeIndexFile();
})();
