'use strict'
// import fs from 'fs';
const fs = require('fs')
const crypto = require('crypto');
const start = Date.now();

setTimeout(() => console.log('Timer 1 finished'), 0)
setImmediate(() => console.log('Inmediate 1 finished'))

/**
 * @param  {} "test-file.txt"
 * @param  {} (
 */
fs.readFile('test-file.txt', () => {
    console.log('I/O finished')
    console.log('__________________')

    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Inmediate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick()'));

    crypto.pbkdf2('password', 'salt', 100000, 'sha512', () => {
        console.log(Date.now - start, 'Password encrypted.')
    });
});

/**
 * @param  {} 'Hellofromthetoplevelcode.'
 */
console.log('Hello from the top level code.')