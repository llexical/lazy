#!/usr/bin/env node

/**
 * lazy code [foldername]
 * Will find the directory you are talking about and then open vs code for you
 */

const program = require('commander');
const shell = require('shelljs');

const settings = require('./libs/settings');
const {checkSettings} = require('./libs/helpers');
const params = {};

program
    .version('0.0.1')
    .arguments('[foldername]')
    .action(foldername => {
        params.folderName = foldername;
    })
    .parse(process.argv);

checkSettings(settings)
    .then(settings.getSettings)
    .then(() => {
        const workFolder = settings.get('workFolder');
        
        shell.cd(workFolder);

        var folder = shell.exec(`
            find . -name "${params.folderName}" -type d -mindepth 2 -maxdepth 2
            `, {silent:true}).stdout;

        if (!folder)
            return console.log(`Folder ${params.folderName} could not be found in ${workFolder}.`)
            
        shell.exec(`code ${folder}`);
    });
    