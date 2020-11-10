const { mdLinks } = require('../mdlinks');

valorUnderfined = [{
        href: 'https://www.eluniversal.com.mx/sites/default/files/2016/09/07/manzana.jpg',
        text: 'ceviche',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md'
    },
    {
        href: 'https://comidasperuanas.net/wp-content/uploads/2019/01/Pachamanca-a-la-olla-500x375.jpg',
        text: 'pachamanca',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md'
    },
    {
        href: 'https://www.todoenperu.net/recetas/wp-content/uploads/2019/04/juane-comida-de-la-selva.jpg',
        text: 'juane',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md'

    }
]

valorTrue = [{
        href: 'https://www.eluniversal.com.mx/sites/default/files/2016/09/07/manzana.jpg',
        text: 'ceviche',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md',
        status: 200,
        statusText: 'OK'
    },
    {
        href: 'https://comidasperuanas.net/wp-content/uploads/2019/01/Pachamanca-a-la-olla-500x375.jpg',
        text: 'pachamanca',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md',
        status: 200,
        statusText: 'OK'
    },
    {
        href: 'https://www.todoenperu.net/recetas/wp-content/uploads/2019/04/juane-comida-de-la-selva.jpg',
        text: 'juane',
        file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md',
        status: 200,
        statusText: 'OK'
    }
]

describe('mdLinks', () => {

    it('should ser una function', () => {
        expect(typeof(mdLinks)).toBe('function');
    });

    test('should extraer los links cuando la opcion es underfined o false', () => {
        return expect(mdLinks('C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md', { validate: undefined })).resolves.toEqual(valorUnderfined);
    });

    test('should extraer los links cuando la opcion es underfined o false', () => {
        return expect(mdLinks('C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md', { validate: true })).resolves.toEqual(valorTrue);
    });

});