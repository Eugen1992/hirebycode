var Repo = require('../models/repo');

function controller(app) {
  app.get("/repos", function(req, res) { 
    Repo.find({}, function(err, repos) {
      var reposMap = {};

      repos.forEach(function(repo) {
        reposMap[repo._id] = repo;
      });

      res.send(reposMap);  
    });
  });
  /*app.get("/services:id", function(req, res) {
    req.db.collection('services').
      find({'_id': req.ObjectId(req.params.id)}).
      limit(1).
      toArray(function (err, records) {
        if (err) {
          res.sendStatus(500);  
        } else {
          res.sendStatus(200);
        }
      });
  });
   app.put("/services/:id", function(req, res) {
     delete req.body._id;
     req.db.collection('services').updateOne({'_id': req.ObjectId(req.params.id)}, req.body, {}, function (err, result) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.send({status: 200});
        }
      });
   });*/
  
  app.delete("/repos/:id", function(req, res) {
    Repo.find({ _id: req.params.id}).remove(function (err) {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log('removed')
        res.sendStatus(204);
      }
    });
  });

  app.post("/repos", function(req, res){
    var newRepo = new Repo(req.body);

    newRepo.save(function(err) {
      if (err) {
        res.sendStatus(500);
      } else {      
        res.status(200).json(newRepo);
      }
    });
  });
}
module.exports.controller = controller;