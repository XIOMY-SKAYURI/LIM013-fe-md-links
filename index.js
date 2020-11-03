const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const colors = require('colors');
const files = require('./lib/files');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
//Limpiamos la consola y mostramos un banner : md_links al ejecutar con node index.js
// clear();

console.log(
    chalk.magenta(
        figlet.textSync('md-links', { horizontalLayout: 'full' })
    )
);
let fs = require('fs');
//---------------------------PASO I: PARA TRAER LINKS---------------------------------
//I.¿LA RUTA ES ABSOLUTA?
const path = require('path');
//Mi ruta absoluta
const pathSlash1 = 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\README.md'
const newPath1 = pathSlash1.replace(/\\\//g, ".")
    // console.log(newPath1)
    //Mi ruta relativa
const pathSlash2 = '.\\README.md'
const newPath2 = pathSlash2.replace(/\\\//g, ".")
    // console.log(newPath2)

function isAbsolute(p) { return path.isAbsolute(p) ? p : path.resolve(p) }
// const rutaabsoluta = isAbsolute(newPath1)

//II.¿El path es un archivo ?
const isArchivo = (p) => {
    let stats = fs.statSync(p);
    const result = stats.isFile()
    return result
}

// console.log(isArchivo('README.md'));
// III.¿El path es un archivo MD. ?
const isFileMd = (p) => {
    return path.parse(p).ext === '.md'
}

///IV. Recorrer el directorio

const getLinklMD = (p) => {
    let AllFiles = [];
    const route = isAbsolute(p);
    if (fs.statSync(route).isDirectory()) {
        fs.readdirSync(route).forEach(file => {
            const files = getLinklMD(path.join(route, file))
            AllFiles = AllFiles.concat(files)
        })
    } else {
        if (path.parse(route).ext === '.md') {
            AllFiles.push(route);
        }
    }
    return AllFiles
}

// console.log(getLinklMD(newPath1));
//-------------------------------PASO 2 : PARA EXTRAER LINKS------------------------------
const extractlinks = (route) => {
        const mdFiles = getLinklMD(route);
        // console.log(mdFiles)
        const ObjectMD = []
        mdFiles.forEach(file => {
            // console.log(file)
            readmdFiles = fs.readFileSync(file, 'utf8')
                // console.log(readmdFiles)
            const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
            const matches = readmdFiles.match(regexMdLinks)
                // console.log('links', matches)
            const singleMatch = /\[([^\[]+)\]\((.*)\)/
            for (var i = 0; i < matches.length; i++) {
                var md = singleMatch.exec(matches[i])
                const href = `${md[2]}`
                const text = `${md[1]}`
                ObjectMD.push({
                    href: href,
                    text: text,
                    file: file,
                })
            }
        })
        return ObjectMD
    }
    // console.log(extractlinks('prueba'))

//------------------------PASO 3: FUNCIÓN VALIDATE----------------------------------------------------
const fetch = require('node-fetch');
//0.crear un nuevo objeto y añadir los nuevos status y statusmessager

const validateLink = (route) => {
        const promiseFetch = [];
        const link = extractlinks(route);
        //1.recorrer el array
        link.forEach(element => {
            //2.hacer petición fecth con la propiedad element.href por cada elemento del array
            promiseFetch.push(fetch(element.href)
                .then(function(response) {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: response.status,
                        statusText: response.statusText,
                    }
                })
                .catch(function() {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: 'error',
                        statusText: 'FAIL',
                    }
                })
            )
        })
        return Promise.all(promiseFetch);
    }
    // console.log(validateLink('prueba'))
    // validateLink(newPath1)
    //     .then(values => {
    //         console.log(values);
    //     });

//-------------------------------------PASO 4:CASO --stats----------------------------------------------
//Crear una función 
//1.-Crear un función donde para stats cuyos parámetros son el arreglo de links 
const statsLinks = (route) => {
        //creo el objeto que contendrá la información de TOTAL y unique
        const link = extractlinks(route);
        const hreflink = link.map(link => {
            return link.href
        })
        const total = hreflink.length;
        // console.log(total);
        const unique = new Set(hreflink)
        const uniques = unique.size
            // console.log(uniques)
        return `Total: ${total} \nUnique: ${uniques}`;
    }
    // console.log(statsLinks(newPath1))
    //función mdlinks que me devuleva la promesa
const mdLinks = (route, option) => {
    return new Promise((resolve, reject) => {
        if (option === undefined) {
            resolve(extractlinks(route));
        } else {
            reject('error')
        }
        if (option.validator === true) {
            resolve(validateLink(route));
        } else {
            reject('error')
        }
    })
};

mdLinks('prueba')
    .then((res) => {
        // console.log(res)
    })
    .catch(console.error);
//-------------------------------------PASO 5:CASO --stats --validate----------------------------------------------

// const stateAndValidate = (options) => {
//     if (options && options.validate) {
//         const broken = links.filter(link =>
//             link.status === 0 || link.status >= 400);
//         broken = broken.map(link => link.href)
//         return `Total: ${broken}`;
//     }
// }

// console.log(stateAndValidate(newPath1))










module.exports = {
    isAbsolute,
    // isArchivo,
    // isMd,
    mdLinks,
};