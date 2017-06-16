'use strict';

const shell = require('shelljs');


module.exports.findFolder = (folderName, workFolder) => {        
    shell.cd(workFolder);

    var folder = shell.exec(`
        find . -name "${folderName}" -type d -mindepth 2 -maxdepth 2
        `, {silent:true}).stdout;

    if (!folder) {
        console.log(`Folder ${folderName} could not be found in ${workFolder}.`)
        return false;
    }

    return folder;
}