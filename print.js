// Function to print weather to console
function printWeather (weather) {
  const message = `The current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
  console.log(message);
}

// Print Error Messages
function printError(error) {
    console.error(error.message);
}




module.exports.weather = printWeather;
module.exports.error = printError;
