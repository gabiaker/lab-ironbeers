const express = require('express');
const app = express();
app.set('view engine', 'hbs');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const punkAPI = new PunkAPIWrapper();


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
  const listOfBeers = {beersFromApi}
  console.log('All the Beers from the database: ', listOfBeers); 
  res.render('beers', listOfBeers);
  })
  .catch(error => console.log(error));
  
  
});

app.get('/random-beers', (req, res) => {
  const randomBeer = punkAPI.getRandom()
  .then(randomBeer => {
  console.log('Random Beer from the database: ', randomBeer)
  res.render('randombeer', randomBeer[0]);
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
