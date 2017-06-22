#!/usr/bin/env node

/**
 * lazy open [foldername]
 * Will find the directory you are talking and open it in finder
 */

const program = require('commander');
const shell = require('shelljs');

const settings = require('./libs/settings');
const {getSettings} = require('./libs/helpers/settings');
const {findFolder} = require('./libs/helpers/find');

const params = {};

program
    .version('0.0.1')
    .arguments('[foldername]')
    .action(foldername => {
        params.folderName = foldername;
    })
    .parse(process.argv);

getSettings()
    .then(() => {
        const folder = findFolder(params.folderName, settings.get('workFolder'));

        if (folder)
            shell.exec(`open ${folder}`);
    })
    .catch(e => console.log(e));
    