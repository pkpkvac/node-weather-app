const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// express applicaiton opeates through this FUNCTION
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// custom directory, usual folder is 'views' directory

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Peter K",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Aboot",
    name: "Big Pete",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "P Daddy",
    message: "Might.",
  });
});
/*
const address = process.argv[2];


  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      } else {
      }
      console.log(location);
      console.log(forecastData);
    });
  });
*/
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide a search address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          res.send([
            {
              forecast: forecastData,
              location: location,
              address: req.query.address,
            },
          ]);
        }
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "P Daddy",
    errorMessage: "Help page not found",
  });
});

// the 404 needs to come last
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "P Daddy",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// app.com
// app.com/help
// app.com/about
