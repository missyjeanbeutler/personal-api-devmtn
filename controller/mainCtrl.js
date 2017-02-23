var user = require('../user.js');
var skillz = require('../skillz.js');
var middleware = require('./middleware.js');
var secrets = require('../secrets.js');

module.exports = {

//--------------read-------------------//

    getName: function(req, res) {
        res.status(200).send({"name": user.name});
    },

    getLocation: function(req, res) {
        res.status(200).send({"location": user.location});
    },

    getOccupations: function(req, res) {
        if(req.query.order) {
            if (req.query.order === 'desc') {
                var desc = user.occupations.sort().reverse();
                res.status(200).send({"occupations": desc})
            } else {
                var asc = user.occupations.sort();
                res.status(200).send({"occupations": asc})
            }
        } else {
            res.status(200).send({"occupations": user.occupations})
        }
    },

    getOccupationsLatest: function(req, res) {
        res.status(200).send({"latestOccupation": [user.occupations[user.occupations.length - 1]]})
    },

    getHobbies: function(req, res) {
        res.status(200).send({"hobbies": user.hobbies})
    },

    getHobbyType: function(req, res) {
        for(var i = 0; i < user.hobbies.length; i++) {
            if(user.hobbies[i].type === req.params.type)
            res.status(200).send(user.hobbies[i]);
        }
    },

    getFamily: function(req, res) {
        if(req.query.relation) {
            var familyRelation = user.family.filter(function(fam){
                return fam.relation === req.query.relation;
            })
            res.status(200).send(familyRelation)
        } 
        res.status(200).send({"family": user.family})
    },

    getFamilyGender: function(req, res) {
        var genders = user.family.filter(function(fam){
            return fam.gender === req.params.gender;
        })
        res.status(200).send(genders)
    },

     getRestaurants: function(req, res) {
        res.status(200).send({"restaurants": user.restaurants})
     },

     getRestaurantName: function(req, res) {
        var favRestaurant = user.restaurants.filter(function(rest){
            return rest.name === req.params.name
        })
        res.status(200).send(favRestaurant)
     },

     getSkillz: function(req, res){
         if(req.query.experience) {
             var experienceLevel = skillz.experience.filter(function(x){
                return x.relation === req.query.experience;
            })
            res.status(200).send(experienceLevel)
         }
         res.status(200).send(skillz)
     },

     getSecrets: function(req, res){
         res.status(200).json('shhhhhh '+ secrets);
     },


//-------------------write------------------//

     putName: function(req, res) {
         user.name = req.body.name;
         res.status(200).json('Name has been changed to ' + user.name)
     },

     putLocation: function(req, res) {
         user.location = req.body.location;
         res.status(200).json('Location has been changed to ' + user.location)
     },

     postHobby: function(req, res) {
         user.hobbies.push(req.body);
         res.status(200).json(user.hobbies)         
     },

     postOccupations: function(req, res) {
         user.occupations.push(req.body.occupations);
         res.status(200).json(user.occupations)         
     },

     postFamily: function(req, res) {
         user.family.push(req.body.family);
         res.status(200).json(user.family)         
     },

     postRestaurants: function(req, res) {
         user.restaurants.push(req.body);
         res.status(200).json(user.restaurants)         
     },

     postSkillz: function(req, res) {
         skillz.push(req.body);
         res.status(200).json(skillz)
     }
}