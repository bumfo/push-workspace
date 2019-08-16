import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
  try {
    const myInput = core.getInput('myInput');
    core.warning(`Hello ${myInput}`);
    
    var myOutput = '';
    var myError = '';

    const options = {};
    options.listeners = {
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
      stderr: (data: Buffer) => {
        myError += data.toString();
      }
    };
    options.cwd = './src';

    await exec.exec('./push.sh', ['dist'], options);
    
    core.warning(`${myOutput}`);
    core.error(`${myError}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
