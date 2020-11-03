#!/usr/bin/env node

import mdLinks from './index.js';
const { program } = require('commander');
program.version('0.0.1');

//El tercer elemento de la matriz process.argv es el primer argumento que realmente pasó el usuario.
//argv es una matriz :valores de argumento
//el primer elemento es el nodo y siempre está presente
//el segundo argumento es la ruta del script y siempre está presente
// console.log(process.argv[2]);
//para omitir los 2 primeros argumentos
var arguments = process.argv.slice(2);
console.log(arguments)
    //Pasar esta ruta como argumento 
program
    .command('md-links') // sub-command name
    .alias('md') // alternative sub-command is `al`
    .description('showlinks') // command description
    .option('-v, --validate <type>', 'Show message') // args.sugar = value, optional, default is 'Low'
    .option('-s, --stats', 'Show basic stats of links') // args.decaf = true/false, optional, default is `undefined`
    .option('-v -s, --validate --stats', 'Show basic stats of links and message') // args.cold = true/false, optional, default is `undefined`
    // .action((route, options) => {

// });

program.parse(process.argv);

if (program.validate) console.log('holi')