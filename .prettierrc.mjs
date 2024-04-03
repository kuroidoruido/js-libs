import fs from 'node:fs';

const personalConfig = JSON.parse(
  fs.readFileSync('./libs/prettier/.prettierrc.json'),
);

export default {
  ...personalConfig,
};
