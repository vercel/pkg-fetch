import chipo from 'child-process-promise';
import chalk from 'chalk';
import mkdirp from 'mkdirp-promise';
import path from 'path';

(async function () {
  const buildPath = path.resolve(__dirname, '../temp');
  await mkdirp(buildPath);

  await chipo.spawn('git',
    [ 'clone', 'https://github.com/nodejs/node', 'node' ],
    { stdio: 'inherit', cwd: buildPath });

  const version = 'v6.3.1';

  await chipo.spawn('git',
    [ 'reset', '--hard', version ],
    { stdio: 'inherit', cwd: buildPath + '/node' });

}()).catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
