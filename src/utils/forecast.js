const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ffd39867978f4b73f75adcb77b91c6ad&units=s&query=" +
    longitude +
    "," +
    latitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${
          body.current.temperature
        } degrees K out, feels like ${
          body.current.feelslike
        } degrees K, and the sky is ${
          body.current.weather_descriptions[0]
        } and chance of precipitation is ${body.current.precip * 100} percent`
      );
    }
  });
};
//`It is currently ${response.body.current.temperature} degrees K out, feels like ${response.body.current.feelslike} degrees K, and the sky is ${response.body.current.weather_descriptions[0]}`
module.exports = forecast;
