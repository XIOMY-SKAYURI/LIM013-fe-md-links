#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
//Limpiamos la consola y mostramos un banner : md_links al ejecutar con node index.js
// clear();

console.log(
    chalk.magenta(
        figlet.textSync('md-links', { horizontalLayout: 'full' })
    )
);

let fs = require('fs');

//I.¿LA RUTA ES ABSOLUTA?
const path = require('path');
//Mi ruta absoluta
const pathSlash1 = 'D:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\index.js'
const newPath1 = pathSlash1.replace(/\\\//g, ".")
    //Mi ruta relativa
const pathSlash2 = '..\\index.js'
const newPath2 = pathSlash2.replace(/\\\//g, ".")

//Condición:Generar un boleano si la ruta es absoluta
//expr1:Retorna el path absoluto---más adelante preguntar si el archivo es .md
//expr2:Convertir el path en absoluto 


function isAbsolute(p) { return path.isAbsolute(p) ? path.isAbsolute(p) : path.resolve(p) }
console.log(isAbsolute(newPath1))
console.log(isAbsolute(newPath1));
// console.log(isAbsolute(newPath2));
//II.¿El path es un archivo ?

//Condición:Generar un boleano si la ruta es archivo o directorio
//expr1:Retorna la ruta del archivo
//expr2:Buscar Path
// const isArchivo = (p) => {
//         let stats = fs.statSync(p);
//         if (stats.isFile(p)) {
//             return stats.isFile(p);
//         } else {
//             stats.isDirectory(p)
//             return false
//         }
//     }

const isArchivo = (p) => {
    let stats = fs.statSync(p);
    return stats.isFile(p) ? stats.isFile(p) : 'No es un archivo'
}

console.log(isArchivo(newPath1));
console.log(isArchivo('README.md'));
console.log(isArchivo('prueba'));

//III.¿El path es un archivo MD. ?

//Condición:Generar un boleano si la ruta es archivo MD o no
//expr1:Retorna el archivo 
//expr2 :Retorna false
// const isMd = (p) => {
//     if (path.parse(p).ext === '.md') {
//         return true;
//     } else
//         return false;
// };

const isMd = (p) => {
    return path.parse(p).ext === '.md' ? true : 'No es un archivo MD'
};

console.log(isMd('README.md'));
console.log(isMd('colores.txt'));

//IV.Leer el archivo
try {
    const data = fs.readFileSync('frutas.md', 'utf8')
    console.log(data)
} catch (err) {
    console.error(err)
}

//V.Extraer link
const MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('frutas.md');

function mdLinks() {
    // fs.writeFileSync("frutas.md", "manzana,mandarina,pera");
    // console.log('HOLA MUNDO');

}

module.exports = {
    mdLinks
};




//CREO UN SERVIDOR USANDO EL FRAMEWORK EXPRESS 
// const express = require('express');
// const colors = require('colors')
// const server = express();

// server.listen(3000, () => {
//     console.log('server on port 3000'.green);
// });