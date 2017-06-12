#!/usr/bin/env node

const program = require('commander');
const promptly = require('promptly');

const settings = require('./libs/settings');

program
    .version('0.0.1')
    .parse(process.argv);

// Welcome message posted on init
const welcomeMsg = `
Welcome to Lazy! 

I am your new terminal helper, created by you for you. I do everything you don't feel like doing making your life easier and enabling you to stay lazy while I do all the hard work.

This is your basic starting setup, you can reset my whole config by running this command again later or by changing a single setting through \`lazy setting [name] <value>\`.
`;

// Message posted if finished succesfully
const doneMsg = `
Well thats all done and setup for you now, you can find your settings file in \`~/.lazy/settings.json\` if you wish to edit it.
`

// Message posted if there was an error saving the files
const errorMsg = `
Oops, saving for some reason failed, please check that this script has the correct permissions to create a settings file in your home directory.
`

/**
 * Lazy Process
 * - lazy says hi
 * - adds settings and saves
 */
console.log(welcomeMsg);

promptly
    .prompt('workFolder: ')
    .then((input) => settings.set('workFolder', input))
    .then(settings.saveSettings)
    .then(() => console.log(doneMsg))
    .catch((e) => console.log(errorMsg, e));