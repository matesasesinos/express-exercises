//Este es un helper para handlebars, se usa para todo lo sea global
module.exports = {
  //envio un titulo de pagina en caso de que no haya uno definido en el controlador
  setPageTitle: () => {
    const pageTitle = "Ejercicios en Express";
    return pageTitle;
  },
  showAlerts: (errors = {}, alerts) => {
    //inyecta la alerta en el tmeplate
    const category = Object.keys(errors);
    let html = "";
    if (category.length) {
      errors[category].forEach((error) => {
        if (error.msg) {
          //console.log(error.msg + ' el error de msg')
          html += ` <div class="alert alert-${category}" role="alert">
                    ${error.msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
        } else {
          //console.log(error + ' el error comunacho')
          html += ` <div class="alert alert-${category}" role="alert">
                    ${error}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
        }
      });
    }
    return (alerts.fn().html = html);
  },
};
