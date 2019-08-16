import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

async function run() {
  try {
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
      cwd: './src',
    };

    await exec.exec(`${await io.which('bash', true)}`, ['./push.sh', 'dist'], options);
    
    core.warning(`${myOutput}`);
    core.error(`${myError}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
