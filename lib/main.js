"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
const fs_1 = __importDefault(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs_1.default.readdir(process.cwd(), (err, files) => {
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
                    stdout: (data) => {
                        myOutput += data.toString();
                    },
                    stderr: (data) => {
                        myError += data.toString();
                    }
                },
            };
            yield exec.exec(`${yield io.which('bash', true)}`, ['src/push.sh', 'dist'], options);
            core.warning(`${myOutput}`);
            core.error(`${myError}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
