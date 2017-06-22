/**
 * lazy volume [volume]
 * Allow you to change the volume on your mac via commandline
 * 
 * NOTE: If you have issues with this, you may have messed up your permissions, on a normal mac system it runs fine.
 */

const program = require('commander');
const shell = require('shelljs');

const params = {};

program
    .version('0.0.1')
    .arguments('[volume]')
    .action(volume => {
        params.volume = volume;
    })
    .parse(process.argv);

shell.exec(`osascript -e "set Volume ${params.volume}"`);
    