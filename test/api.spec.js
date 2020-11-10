const { isAbsolute, newPath1, newPath2, getLinklMD, extractlinks, validateLink, statsLinks } = require('../api');


describe('isAbsolute', () => {
    it('debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
    it('debería retornar la misma ruta para newPath1', () => {
        expect(isAbsolute(newPath1)).toBe('C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\README.md');
    });
    it('debería retornar convertir la ruta absoluta a relativa para newPath2', () => {
        expect(isAbsolute(newPath2)).toBe('C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\README.md');
    });
});


describe('getLinklMD', () => {

    it('should ser una function', () => {
        expect(typeof(getLinklMD)).toBe('function');
    });

    it('should imprimir un array de archivos MD', () => {
        expect(getLinklMD(
            'prueba', )).toStrictEqual([
            'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md',
            'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md',
            'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\comida.md'
        ]);
    });

});

describe('extractlinks', () => {

    it('should ser una function', () => {
        expect(typeof(extractlinks)).toBe('function');
    });

    it('should mostrar propiedades de los links', () => {
        expect(extractlinks('prueba')).toStrictEqual([{
                href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRNcZ01uXNZ86J3OglBbw5PAR2WsQl0MC4_A&usqp=CAU',
                text: 'caballo',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md'
            },
            {
                href: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/04/02/Recortada/img_mrius_20190402-141602_imagenes_lv_terceros_gato_nombre2-328-kLmH-U461425413181OZB-992x558@LaVanguardia-Web.jpg',
                text: 'gato',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md'
            },
            {
                href: 'https://static2.abc.es/media/familia/2019/07/22/golden-khtC--620x349@abc.jpg',
                text: 'perro',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md'
            },
            {
                href: 'https://www.ashoka.org/sites/default/files/styles/medium_1600x1000/public/thumbnails/images/daniela-kreimer.jpg?itok=R89tVtb4',
                text: 'garcia',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md'
            },
            {
                href: 'https://lamenteesmaravillosa.com/wp-content/uploads/2018/09/hombre-creido-pensando-que-sabe.jpg',
                text: 'guerra',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md'
            },
            {
                href: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/0121/production/_102798200_2a.gettyimages-875752234.jpg',
                text: 'lopez',
                file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md'
            },
            {
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
        ]);
    });

});

describe('validateLink', () => {

    it('should ser una function', () => {
        expect(typeof(validateLink)).toBe('function');
    });

    it('should validar los link ', () => {
        return validateLink('prueba').then(values => {
            expect(values).toStrictEqual([{
                    href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRNcZ01uXNZ86J3OglBbw5PAR2WsQl0MC4_A&usqp=CAU',
                    text: 'caballo',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/04/02/Recortada/img_mrius_20190402-141602_imagenes_lv_terceros_gato_nombre2-328-kLmH-U461425413181OZB-992x558@LaVanguardia-Web.jpg',
                    text: 'gato',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://static2.abc.es/media/familia/2019/07/22/golden-khtC--620x349@abc.jpg',
                    text: 'perro',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\animales.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://www.ashoka.org/sites/default/files/styles/medium_1600x1000/public/thumbnails/images/daniela-kreimer.jpg?itok=R89tVtb4',
                    text: 'garcia',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://lamenteesmaravillosa.com/wp-content/uploads/2018/09/hombre-creido-pensando-que-sabe.jpg',
                    text: 'guerra',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/0121/production/_102798200_2a.gettyimages-875752234.jpg',
                    text: 'lopez',
                    file: 'C:\\LABORATORIA\\md-link\\LIM013-fe-md-links\\prueba\\apellidos.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
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
            ])
        });
    });
});