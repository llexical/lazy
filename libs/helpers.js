'use strict'

module.exports.checkSettings = settings => {
    return settings
        .hasSettings()
        .catch(() => {
            console.log(`no settings file found, please use \`lazy init\` to create one.`);
            process.exit(1);
        });
}