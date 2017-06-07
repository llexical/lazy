'use strict'
const fs = require('fs');
const os = require('os');


class Settings {

    constructor() {
        this.dir = `${os.homedir()}/.lazy`;
        this.fileName = "settings.json";
        this._defaults = {
            'workFolder': ''
        }
        this._settings = {}

        const bind = ['saveSetting', 'saveSettings'];
        bind.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }

    saveSetting(key, value) {
        this._settings[key] = value;
    }

    saveSettings() {
        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(`${this.dir}/${this.fileName}`, JSON.stringify(this._settings), (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}


module.exports = new Settings;