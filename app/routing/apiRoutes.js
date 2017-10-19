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

  app.post("/api/new", function(req, res) {

    var newfriend = JSON.parse(req.body.scores);
    var newScores = [];

    for (i = 0; i < newfriend.length; i++) {
      newScores.push(newfriend[i]);
    }

    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: newScores
    };

    var originalArray = friendData;
    friendData.push(newFriend);

    // Number of questions
    var numQ = 10;
    var totalDifference = [];

    // To get data for existing friends and eliminate the one just added
    var existingFriends = friendData.length - 1;

    for (j = 0; j < existingFriends; j++) {
      var friendsScore = friendData[j].scores;
      var difference = 0;

      for (b = 0; b < numQ; b++) {
        var diff = newScores[b] - friendData[j].scores[b];
        diff = Math.abs(diff);
        difference = difference + diff;
      }
      totalDifference.push(difference);
    }
    // Smallest difference represents friend match
    var smallestDiff = Math.min.apply(0, totalDifference);

    // Finding all matches with same difference
    var idx = totalDifference.indexOf(smallestDiff);
    var index = [];

    while (idx != -1) {
      index.push(idx);
      idx = totalDifference.indexOf(smallestDiff, idx + 1);
    }

    // Generate a random number for friend matches
    var lengthIndex = index.length;

    var random = Math.floor((Math.random() * lengthIndex));
    var value = index[random];

    res.json(originalArray[value]);
  });

};