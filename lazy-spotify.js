/**
 * lazy spotify [action]
 * Gives you Spotify commands: 
 *  - play
 *  - pause 
 *  - quit 
 *  - mute
 *  - unmute
 *  - next
 *  - prev
 * 
 * NOTE: If you have issues with this, you may have messed up your permissions, on a normal mac system it runs fine.
 */

const program = require('commander');
const shell = require('shelljs');

const params = {};

program
    .version('0.0.1')
    .arguments('[action]')
    .action(action => {
        params.action = action;
    })
    .parse(process.argv);


const actions = ['play', 'pause', 'next', 'prev', 'quit'];
let action;

if (!actions.includes(params.action)) {
  console.log('That is not a valid option!');
  process.exit();
}

switch(params.action) {
  case 'next':
  case 'prev':
    action = (params.action === 'prev' ? 'previous' : 'next') + ' track';
    break;
  default:
    action = params.action;
}

shell.exec(`osascript -e 'tell application "Spotify" to ${action}'`);