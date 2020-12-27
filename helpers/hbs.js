const path = require('path');
require('dotenv').config({ path: '.env' });

module.exports = {
  //alertas
  showAlerts: (errors = {}, alerts) => {
    //inyecta la alerta en el tmeplate
    const category = Object.keys(errors);
    let html = "";
    if (category.length) {
      errors[category].forEach((error) => {
        if (error.msg) {
          html += ` <div class="alert alert-${category}" role="alert">
                    ${error.msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>`;
        } else {
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
