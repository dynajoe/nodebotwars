var request = require('request');
var stdin = process.openStdin();

stdin.on('data', function (input) {
   request.post('http://access.alchemyapi.com/calls/text/TextGetTextSentiment', {form: {  
      apikey: 'a06ca02ad7c2e23ce1f35792825c902d5e48e4ef', 
      text: input.toString()
   }}).pipe(process.stdout);
});


