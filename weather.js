// Problem: Search current temp by zip OR city, state - Use weather API (API Key needed)
// Require http
const http = require ('http');
const api = require('./api_keys.json');
const print = require('./print.js')

// Retrieve DATA
function get(query) {

    try {

        const request = http.get(`http://api.wunderground.com/api/${api.wunderground_key}/geolookup/conditions/q/${query}.json`, response => {

          // Read DATA and attach to body
          let body = "";
          response.on('data', data => {
            body += data;
          });

          // Parse JSON
          response.on('end', () => {
            const weather = JSON.parse(body);
            //console.log(weather.response);
            //if (weather.response.error) {
            //  console.log("yes");
            //}
          // Print
            print.weather (weather);
          });



        });

        request.on('error', print.error);

      } catch(error) {
          print.error(error);
        }


}

// TODO: ERROR HANDLING

// Join multiple values passed and replace spaces with underscores
const query = process.argv.slice(2).join("_").replace(' ', '_');
get(query);
