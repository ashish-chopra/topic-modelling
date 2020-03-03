const { spawn } = require('child_process');
const commander = require('commander');
const path = require('path');
const { mkdir } = require('./util/helper');

const ROOT_FOLDER = path.join(".", "modelling");

commander
    .option('-f --file <filename>', 'name of the file in which output is to be produced')
    .parse(process.argv);

mkdir(ROOT_FOLDER);
const fileName = commander.file || `repositories.mallet`;
const MALLET_CMD_ARGS = `import-dir --input dataset --output "modelling/${fileName}" --remove-stopwords --keep-sequence --print-output`;

const cmd = spawn('mallet', MALLET_CMD_ARGS.split(" "), { shell: true });

cmd.stdout.on('data', (chunk) => {
    console.log(chunk.toString());
});

cmd.stderr.on('data', (chunk) => {
    console.log(chunk.toString());
});