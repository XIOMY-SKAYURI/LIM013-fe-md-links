#!/usr/bin/env node

const chalk = require('chalk');
const { mdLinks } = require('./mdlinks');
const { statsLinks } = require('./api');
// console.log(mdLinks)
//El tercer elemento de la matriz process.argv es el primer argumento que realmente pasó el usuario.
//argv es una matriz :valores de argumento
//el primer elemento es el nodo y siempre está presente
//el segundo argumento es la ruta del script y siempre está presente
// console.log(process.argv[]);
//para omitir los 2 primeros argumentos
// const args = process.argv.slice(2)
// const cadena = args.toString()
// const m = cadena.includes("--stats --validate")
// console.log(m)
//Aquí capturamos el path
const route = process.argv[2];
// console.log(route)
//Aquí capturo opciones--- usar slice para sacar parte del array
const opcion = process.argv[3]
const opciones = process.argv.slice(3)
    // console.log(opciones)
const hasStats = opciones.includes('--stats');
const hasValidate = opciones.includes('--validate');
// const hasValidateStats = opciones.includes('--validate --stats');
// const hasStatsValidate = opciones.includes('--stats --validate');
//Crear función CLI
const cli = () => {
    if (opcion === undefined) {
        //llamar a la funcion mdlinks principal
        return mdLinks(route, { validate: undefined })
            .then((res) => {
                res.forEach(element =>
                    console.log((`HREF: ${chalk.yellow.underline(element.href)},TEXT: ${chalk.white.underline(element.text)},FILE:${chalk.magenta.underline(element.file)}`)));
            })
            .catch(err => console.log(err))
    } else if (opciones.includes('--validate')) {
        //llamar al mdlink con opcion true
        return mdLinks(route, { validate: true })
            .then((res) => {
                res.forEach(element =>
                    console.log((`HREF: ${chalk.yellow(element.href)},TEXT: ${chalk.white(element.text)},FILE:${chalk.magenta(element.file)},STATUS:${chalk.blue.inverse(element.status)},MESSAGE:${chalk.green.underline(element.statusText)}`)));
            })

    } else if (opciones.includes('--stats')) {
        // console.log('estamos en stats')
        //llamar al mdlinks sin opcions cuando consumo la promeso y llamo el array de objetos 
        return mdLinks(route, { validate: false })
            .then((res) => {
                console.log(statsLinks(res));
            })
    } else if (opciones.includes('--nosale')) {
        //llamar md links con validate true y pasar a la funcion stats y dar broken//obtener array links pasarlo por stats y recudir a link broken
        return mdLinks(route, { validate: true })
            .then((res) => {
                var broken = res.filter(el => el.status === 404 || el.status === 'error');
                console.log(statsLinks(res))
                console.log(`Broken:${chalk.red(broken.length)}`)
            })
    }
    //calcular link rotos: un link roto o enlace roto son enlaces que están en la web pero no sirven o ya no existen es sinónimo de toparse con la dirección HTTP 404
}
cli();

module.exports = {
    cli,
};