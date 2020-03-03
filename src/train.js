const { spawn } = require('child_process');
const commander = require('commander');
const path = require('path');
const { mkdir } = require('./util/helper');

const ROOT_FOLDER = path.join(".", "modelling");

commander
    .option('-f --file <filename>', 'name of the file in which output is to be produced')
    .option('-s --start <min-num-topics>', 'minimum number of topics')
    .option('-e --end <max-num-topics>', 'maximum number of topics')
    .option('-i --increment <step-size>', 'increment by step size')
    .parse(process.argv);

const userOptions = {
    fileName: commander.file || `repositories.mallet`,
    min: commander.start ? parseInt(commander.start) : 5,
    max: commander.end ? parseInt(commander.end) : 20,
    step: commander.increment ? parseInt(commander.increment) : 1
}

function getMalletArguments(num_topics, inputFileName) {
    const MALLET_CMD_ARGS = [
        `train-topics`,
        `--input modelling/${inputFileName}`,
        `--num-topics ${num_topics}`,
        `--num-iterations 1000`,
        `--optimize-interval 10`,
        `--output-state modelling/${num_topics}/topic-state.zip`,
        `--output-topic-keys modelling/${num_topics}/repo-keys.txt`,
        `--output-doc-topics modelling/${num_topics}/topic-composition.txt`
    ];
    return MALLET_CMD_ARGS.join(" ").split(" ");
}


function spawnProcess(num_topics, fileName, cb) {
    function createProcess(input) {
        console.log('Spawing a process for: ', input);
        mkdir(ROOT_FOLDER, input.toString());
        const cmd = spawn('mallet', getMalletArguments(input, fileName), { shell: true });
        cmd.stdout.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        cmd.stderr.on('data', (chunk) => {
            console.log(chunk.toString());
        });

        cmd.on('exit', (code) => {
            console.log(`The process exited with code ${code}`);
            cb();
        });
    }
    createProcess(num_topics);
}

function callback() {
    userOptions.min += userOptions.step;
    if (userOptions.min <= userOptions.max) {
        spawnProcess(userOptions.min, userOptions.fileName, callback);
    }
}

spawnProcess(userOptions.min, userOptions.fileName, callback);