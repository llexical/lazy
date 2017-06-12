#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')
    .command('init', 'allows you to setup your config')
    .command('goto [name]', 'goes to a repo with your name')
    .command('code [name]', 'opens vs code for given folder')
    .parse(process.argv);