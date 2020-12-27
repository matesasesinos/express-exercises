# express-exercises
_Original https://github.com/matesasesinos/express-exercises.git_

## Prerequisitos
Tener instalado Node y npm, se instalan ambos con cualquiera de estos instaladores: [click aquí](https://nodejs.org/es/) 

## Comenzando 🚀
Clonar y ejecutar npm install.

Crear base MongoDB (para local, Community Edition: https://www.mongodb.com/try/download/community?tck=docs_server)

* Instalar en Win 10: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
* Instalar en Linux: https://docs.mongodb.com/manual/administration/install-on-linux/
* Instalar en MacOS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
* User Cloud Atlas (gratis hasta 500MB): https://www.mongodb.com/cloud/atlas

Gestor de base de datos MongoDB Compass: https://www.mongodb.com/products/compass

Crear un archivo .env con el contenido del arhcivo .env.example.

Importante configurar la base de datos MongoDB, en el primer inicio, el middleware "configuration" va a crear la configuración por defecto del sitio. Esta configuración se puede cambiar en middlewares/configuration.js, también se puede modificar modificando primero el modelo en models/Configuration.js. En las vistas se puede llamar el locals "configuration", por ejemplo para el titulo {{configuration.title}} .

Una vez hecho esto con npm run dev corremos el nodemon y podemos ingresar en http://localhost:5000 (el número de puerto corresponde al puerto puesto en .env).

Para el login se crea un usuario demo con los siguientes datos:
* user: demo@demo.com
* pass: 123456
