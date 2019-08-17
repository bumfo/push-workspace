import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import path from 'path';

async function run() {
  try {
    var cwd = path.resolve(__dirname, '..')

    const ref = core.getInput('ref');
    core.warning(`Hello ${ref}`);

    const options = {
      cwd: cwd,
    };

    await exec.exec(`${await io.which('bash', true)}`, ['src/push.sh', ref], options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
