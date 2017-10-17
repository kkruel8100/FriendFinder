// LOAD DATA
// Linking routes to "data" source.

var friendData = require("../data/friends");

// ROUTING

module.exports = function(app) {

  // API GET Requests

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests

  app.post("/api/friends/new", function(req, res) {
    var newfriend = req.body;
    friendData.push(newfriend);
    res.json(newfriend);
  });

};