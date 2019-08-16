import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import path from 'path';

import fs from 'fs';



async function run() {
  try {
    var cwd = path.resolve(__dirname, '..')

    fs.readdir(cwd, (err, files) => {
      core.warning('' + err);
      files.forEach(file => {
        core.warning(file);
      });
    });

    core.warning(`${__dirname}`);

    const myInput = core.getInput('myInput');
    core.warning(`Hello ${myInput}`);

    const options = {
      cwd: cwd,
    };

    await exec.exec(`${await io.which('bash', true)}`, ['src/push.sh', 'dist'], options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
