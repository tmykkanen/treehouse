// Problem: look at users badge count and JS points
// Solution: Use node.js to connect to treehouse's API to get profile information and print out
// Require https
const https = require('https');
// Require http
const http = require('http');
// Require print
const print = require('./print.js');




function getProfile(username) {
    try {
      // Connect to API URL (https://teamtreehouse.com/username.json)
      const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

          if (response.statusCode === 200) {

              // Read the data
              let body = "";
              response.on('data', data => {
                  body += data.toString();
              });

              // Parse the data
              response.on('end', () => {
                  try {
                      const profile = JSON.parse(body);
                      print.message(username, profile.badges.length, profile.points.JavaScript);
                  } catch (error) {
                        print.error(error);
                    };
                });

          } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]}).`;
                const statusCodeError = new Error(message);
                print.error(statusCodeError);
          };

      });

      request.on('error', print.error);

    } catch (error) {
        print.error(error);
    }
}

module.exports.get = getProfile;
