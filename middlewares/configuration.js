const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');

const configuration = {
    setConfiguration: async (siteID) => {
        const configuration = await Configuration.findOne({
            siteID
        });
        if(!configuration) {
            await Configuration.create({
                siteID: 1,
                title: 'Blogcito en Mongo',
                email: 'email@blogcito.com',
                phone: '+5493456508244',
                phone_2: '+543456483117',
                address_1: 'Dirección Linéa 1',
                address_2: 'Dirección Linéa 2',
                city: 'Localidad o Ciudad',
                country: 'País',
                description: 'Mini CMS básico hecho en Node + Express, para propositos de ejercicio',
                copy: '®2020-2021 | Juan Iriart (matecito.com.ar)',
                active: 1
            });
            console.log('Configuración Inicial Creada Existosamente');
        } 
        return configuration;
    }
}

module.exports = configuration;