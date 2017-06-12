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

        // Bind methods
        const bind = ['set', 'get', 'saveSettings', 'getSettings'];
        bind.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }

    hasSettings() {
        return new Promise((resolve, reject) => {
            fs.stat(`${this.dir}/${this.fileName}`, (err, stats) => {
                if (err) reject(err);
                resolve(stats)
            });
        });
    }

    get(key) {
        return this._settings[key];
    }

    set(key, value) {
        this._settings[key] = value;
    }

    getSettings(forceReload=false) {
        const self = this;
        
        return new Promise((resolve, reject) => {
            if (!forceReload && Object.keys(self._settings).length) {
                return resolve(self._settings);
            }

            fs.readFile(`${this.dir}/${this.fileName}`, (err, data) => {
                if (err) return reject(err);
                
                self._settings = JSON.parse(data);
                return resolve(self._settings);
            });
        });
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