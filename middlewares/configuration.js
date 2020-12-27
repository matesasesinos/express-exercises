const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');
const Users = mongoose.model('User');

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
    },
    setDemoUser: async () => {
        const user = await Users.findOne({
            email: 'demo@demo.com'
        });
        if(!user) {
            await Users.create({
                name: 'Demo Demo',
                email: 'demo@demo.com',
                phone: '+549123456789',
                password: '123456',
                token: 'token123',
                created: Date.now(),
                avatar: '',
                active: 1
            });
            console.log('Usuario demo creado')
        }
    }
}

module.exports = configuration;