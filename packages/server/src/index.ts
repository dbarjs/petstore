import chalk from 'chalk';

import app from './app';

app.listen(3333, () => {
  // eslint-disable-next-line
  console.log(chalk.bold.greenBright('🚀 Server started on port 3333!'));
});
