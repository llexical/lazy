'use strict'

const settings = require('../settings');

module.exports.getSettings = () => {
    return settings
        .hasSettings()
        .catch(() => {
            console.log(`no settings file found, please use \`lazy init\` to create one.`);
            process.exit(1);
        })
        .then(settings.getSettings);
}