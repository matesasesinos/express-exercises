//Este es un helper para handlebars, se usa para todo lo sea global
module.exports = { 
    //envio un titulo de pagina en caso de que no haya uno definido en el controlador
    setPageTitle: () => {
        const pageTitle = 'Ejercicios en Express';
        return pageTitle;
    }
}