//const axios = require("axios");

/*
STRIPE
ENTRAMOS CON NUESTRO CORREO GOOGLE
henrymatch2022@gmail.com
Contraseña proyectofinal2022

MERCADO PAGO
repo nicolas
https://github.com/NicolasCastroGarcia/mercadopago-workshop/blob/main/routes/index.js

ENTRAMOS CON NUESTRO CORREO GOOGLE
henrymatch2022@gmail.com
Contraseña proyectofinal2022

https://www.mercadopago.com.ar/home
https://www.mercadopago.com.ar/developers/panel (AQUI ESTAN LOS TOKEN)

Access Token PRODUCCION
APP_USR-1394586415630733-070402-977e9058d773f81b9616ed5a012010b3-1153672468

curl -X POST \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer TEST-1394586415630733-070402-2e5f53eabb7bca9bf00e2657de70f522-1153672468' \
"https://api.mercadopago.com/users/test" \
-d '{"site_id":"MLA","description" : "a description"}'

Access Token PRUEBA
TEST-1394586415630733-070402-2e5f53eabb7bca9bf00e2657de70f522-1153672468

EN https://www.mercadopago.com.ar/developers/panel/test-users PARA CREAR UN USUARIO DE PRUEBA O VER LOS USUARIOS DE PRUEBA E INICIAR SESION CON EL VENDEDOR

PRUEBA: Vendedor Henry Matc
CREE SU CUENTA
{"id":1154178107,
"nickname":"TETE430398", //USERNAME PARA LOGEARSE
"password":"qatest1157",
"site_status":"active",
"site_id":"MLA",
"description":"a description",
"date_created":"2022-07-04T03:28:24-04:00",
"date_last_updated":"2022-07-04T03:28:24-04:00"}

// EL ID DE LOS USUARIOS VA EN EL MAIL DEL BODY
PRUEBA: Usuario Henry Match 1 
{"id":1154177275,
"nickname":"TESTPFWPPJJO",
"password":"qatest4820",
"site_status":"active",
"site_id":"MLA",
"description":"a description",
"date_created":"2022-07-04T03:31:07-04:00",
"date_last_updated":"2022-07-04T03:31:07-04:00"}

PRUEBA: Usuario Henry Match 2
{"id":1154175850,"nickname":"TETE7313805","password":"qatest7021","site_status":"active","site_id":"MLA","description":"a description","date_created":"2022-07-04T03:32:48-04:00","date_last_updated":"2022-07-04T03:32:48-04:00"} 

PRUEBA: Usuario Henry Match 2
nickname TETE3278589
password qatest2621
*/

/* class subscriptionService {
  async getSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción Henry Match",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "1154177275@testuser.com",
    };

    const subscription = await axios.get(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción Henry Match",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "1154177275@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = subscriptionService;
 */
