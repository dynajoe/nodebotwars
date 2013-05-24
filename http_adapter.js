var request = require('request');
var path = require('path');

var Adapter = function (endpoint) {
   this.endpoint = endpoint;
};

Adapter.prototype.send = function (action, data, cb) {
   request.post({
      headers: {'content-type' : 'application/json'},
      url: path.join(this.endpoint, '/' + action),
      body: JSON.stringify(data),
      }, 
      function (error, response, body) { 
         if (error) { 
            cb(error); 
         }
         else {
            cb(JSON.parse(body)); 
         }
      }
   );
};

module.exports = Adapter;

