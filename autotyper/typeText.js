import { sleep } from 'bun';

const fs = require('fs');
const robot = require('robotjs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Configure yargs to handle command-line arguments
const argv = yargs(hideBin(process.argv))
    .option('path', {
        alias: 'p',
        description: 'Path to the text file',
        type: 'string',
        demandOption: true
    })
    .option('delay', {
        alias: 'd',
        description: 'Delay in milliseconds between keystrokes',
        type: 'number',
        default: 100
    })
    .help()
    .alias('help', 'h')
    .argv;

function readFileAndType(filePath, delay = 100) {
    // Read the file contents
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Simulate typing each character with a delay
        typeText(data, delay);
    });
}

function typeText(text, delay) {
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            robot.typeString(text[i]);
            i++;
            setTimeout(typeChar, delay);
        }
    }

    typeChar();
}

// Use the command-line arguments
const filePath = argv.path;
const delayBetweenKeystrokes = argv.delay;
sleep(5000);
readFileAndType(filePath, delayBetweenKeystrokes);
