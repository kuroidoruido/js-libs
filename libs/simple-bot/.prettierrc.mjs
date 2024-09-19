import shareConfig from '@anthonypena/prettier-config';

// import fs from 'node:fs';

// const personalConfig = JSON.parse(
//   fs.readFileSync('./libs/prettier/.prettierrc.json'),
// );
console.log(shareConfig);

export default {
  ...shareConfig,
};
