const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');

exports.panelHome = (req,res) => {
    res.render('panel/panel', {
        pageTitle: 'Panel de Usuario',
        bodyClass: 'body-panel-home',
        panel: true
    })
}


exports.configurationEdit = async (req,res) => {
    const configuration = await Configuration.findOne({
        siteID: 1
    });
    res.render('panel/configuration', {
        pageTitle: 'Configuración del Sitio',
        bodyClass: 'body-configuration',
        config: true,
        configuration
    })
}