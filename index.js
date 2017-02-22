var express = require('express');
var bodyParser = require('body-parser');
var user = require('./user.js');
var middleware = require('./controller/middleware.js');
var mainCtrl = require('./controller/mainCtrl.js');
var skillz = require('./skillz.js');
var secrets = require('./secrets.js');


var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(middleware.addHeaders);

//--------------read-------------------//

app.get('/name', mainCtrl.getName)
app.get('/location', mainCtrl.getLocation)
app.get('/occupations', mainCtrl.getOccupations)
app.get('/occupations/latest', mainCtrl.getOccupationsLatest)
app.get('/hobbies', mainCtrl.getHobbies)
app.get('/hobbies/:type', mainCtrl.getHobbyType)
app.get('/family', mainCtrl.getFamily)
app.get('/family/:gender', mainCtrl.getFamilyGender)
app.get('/restaurants', mainCtrl.getRestaurants)
app.get('/restaurants/:name', mainCtrl.getRestaurantName)
app.get('/skillz', mainCtrl.getSkillz)
app.get('/secrets/:username/:id', middleware.verifyUser, mainCtrl.getSecrets)

//-------------------write------------------//

app.put('/name', mainCtrl.putName);
app.put('/location', mainCtrl.putLocation);
app.post('/hobbies', mainCtrl.postHobby);
app.post('/occupations', mainCtrl.postOccupations);
app.post('/family', mainCtrl.postFamily);
app.post('/restaurants', mainCtrl.postRestaurants);
app.post('/skillz', middleware.generateId, mainCtrl.postSkillz);



app.listen(port, function(){
    console.log('listening on port ' + 3000)
})