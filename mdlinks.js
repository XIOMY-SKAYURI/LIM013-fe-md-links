const { extractlinks, validateLink } = require('./api');
//función mdlinks que me devuleva la promesa
const mdLinks = (route, option) => {
    return new Promise((resolve, reject) => {
        if (option.validate === false || option.validate === undefined) {
            resolve(extractlinks(route));
        } else if (option.validate === true) {
            resolve(validateLink(route));
        } else {
            reject('error')
        }
    })
};

module.exports = {
    mdLinks,
};