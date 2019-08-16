import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import path from 'path';

import fs from 'fs';



async function run() {
  try {
    fs.readdir(process.cwd(), (err, files) => {
      core.warning('' + err);
      files.forEach(file => {
        core.warning(file);
      });
    });

    core.warning(`${process.cwd()}`);

    const myInput = core.getInput('myInput');
    core.warning(`Hello ${myInput}`);

    var myOutput = '';
    var myError = '';

    const options = {
      listeners: {
        stdout: (data: Buffer) => {
          myOutput += data.toString();
        },
        stderr: (data: Buffer) => {
          myError += data.toString();
        }
      },
      // cwd: path.resolve(process.cwd(), 'src'),
    };

    await exec.exec(`${await io.which('bash', true)}`, ['src/push.sh', 'dist'], options);

    core.warning(`${myOutput}`);
    core.error(`${myError}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
