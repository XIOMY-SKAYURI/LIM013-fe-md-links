// basic file management
//1.-Obtener el nombre del repositorio
//2.-Comprobarsi existe un repositorio

const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    }
};