var Profile = require("./profile.js");
const renderer = require('./renderer.js')
const querystring = require('querystring')
const commonHeaders = {'Content-Type': 'text/html'};


// Handle HTTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    if(request.method.toLowerCase() === "get"){
        //show search
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);
        renderer.view("search", {}, response);
        renderer.view('footer', {}, response);
        response.end();
      } else {
        //if url == "/" && POST
        // get POST data
        request.on("data", function (postBody){
          // Extract username
          var query = querystring.parse(postBody.toString());
          //redirect to /username
          response.writeHead(303, {'Location': '/' + query.username});
          response.end();
        });


      }
  }

}

//Handle HTTP route GET /:username i.e. /tylermykkanen
function user(request, response) {
  //if url == "/...."
  const username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile

      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });

  }
}

module.exports.home = home;
module.exports.user = user;
