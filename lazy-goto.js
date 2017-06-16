#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');

const settings = require('./libs/settings');
const {getSettings} = require('./libs/helpers/settings');
const params = {};

program
    .version('0.0.1')
    .arguments('[foldername]')
    .action(function (foldername) {
        params['folderName'] = foldername;
        console.log(params);
    });

// Does not work lollll
getSettings()    
    .then(() => {
        const workFolder = settings.get('workFolder');
        
        var folder = shell.exec(`
            cd ${workFolder}
            find . -name "search" -type d -mindepth 2 -maxdepth 2
            `, {silent:true}).stdout;

        console.log('folder', folder);
        console.log('folderName', params.folderName);

        console.log('cwd', process.cwd());
        shell.exec('goto "/Users/lizzie/Work"');
    })
    .catch(e => console.log(e));
    