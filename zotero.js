// Make app to search zotero collection by author and return titles by author.
const https = require ('https');
const api = require ('./api_keys.json');



// TODO: ERROR HANDLING

function get(query) {

    const request = https.get(`https://api.zotero.org/users/388211/items?q=${query}&qmode=titleCreatorYear&itemType=-attachment&key=${api.zotero_key}`, response => {

      let buffer = "";
      response.on('data', dataChunk => {
        buffer += dataChunk;
      });

      response.on('end', () => {
        // Parse JSON into zquery object
        const zquery = JSON.parse(buffer);

        // Iterate through zquery object, finding items and authors
        let i = 0;
        zquery.forEach(function(item) {
          let n = 0;
          let authors = "";
          zquery[i].data.creators.forEach (function(item){
            authors += zquery[i].data.creators[n].lastName; // Figure out how to join with comma delimiters
            n++
          });

          // Call print function
          print(zquery[i].data.title, authors);

          // Iterate counter for index
          i++
        });
      });
    });
}


// Function to print output
function print(title, authors) {
  console.log(title + " (" + authors + ")" );
}

// Get Query by last name (e.g. derouchie)
const query = process.argv.slice(2);
console.log (`Searching for ${query}.`);
// Call get based on arguments
get(query);
