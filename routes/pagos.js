var express = require('express');
var conekta = require('conekta');
var app = express();
conekta.api_key = 'key_yHvxMVRxrTSk3Pacuy5C2Q';
//Rutas

app.get('/', (req , res , next) =>{

    order = conekta.Order.create({
        "line_items": [{
            "name": "Tacos",
            "unit_price": 1000,
            "quantity": 12
        }],
        "shipping_lines": [{
            "amount": 1500,
            "carrier": "FEDEX"
        }], //shipping_lines - phyiscal goods only
        "currency": "MXN",
        "customer_info": {
          "name": "Fulanito Pérez",
          "email": "fulanito@conekta.com",
          "phone": "+5218181818181"
        },
        "shipping_contact":{
           "address": {
             "street1": "Calle 123, int 2",
             "postal_code": "06100",
             "country": "MX"
           }
        }, //shipping_contact - required only for physical goods
        "charges":[{
          "payment_method": {
            "type": "oxxo_cash"
          }
        }]
      }, function(err, res) {
          console.log(res.toObject());
          
      });
      

});
module.exports = app;