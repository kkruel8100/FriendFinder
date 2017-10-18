$(document).ready(function() {

  var scoresInt = [];
  var friendsScore = [];
  var totalDifference = [];
  var index = [];
  var numQ = 10;

  $("#submit").on("click", function(event) {
    event.preventDefault();
    var validate = false;

    scoresInt = [];
    for (i = 1; i <= numQ; i++) {
      var score = parseInt($("#q" + i).val());
      scoresInt.push(score);
    }

    console.log(scoresInt);

    // This is to verify whether the value of each answer in zero or not
    for (i = 0; i < scoresInt.length; i++) {
      if (scoresInt[i] === 0) {
        validate = true;
      }
    }

    if ($("#name").val() !== "" && $("#photo").val() !== "" && validate === false) {
      // Here we grab the form elements
      var newFriend = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        scores: JSON.stringify(scoresInt)
      };
      console.log(scoresInt);

      $.post("/api/friends/new", newFriend)
        .done(function(data) {
          alert("Adding to Friend Database");
        });


      // Clear the form when submitting
      $("#name").val("");
      $("#photo").val("");
      $(".chosen-select").val(0);

      runFriendQuery(scoresInt);
    } else {
      alert("Please complete the entire form");
    }
  });

  function runFriendQuery(scoresInt) {
    // Get API data

    friendsScore = [];
    $.get("/api/friends", function(data) {

      if (data) {

        // To get data for existing friends and eliminate the one just added
        var existingFriends = data.length - 1;
        for (i = 0; i < existingFriends; i++) {
          friendsScore = data[i].scores;
          var difference = 0;
          for (x = 0; x < numQ; x++) {
            difference += Math.abs(scoresInt[x] - parseInt(friendsScore[x]));
          }
          totalDifference.push(difference);
        }
        // Smallest difference represents friend match
        var smallestDiff = Math.min.apply(0, totalDifference);
        // Finding all matches with same difference
        var idx = totalDifference.indexOf(smallestDiff);
        while (idx != -1) {
          index.push(idx);
          idx = totalDifference.indexOf(smallestDiff, idx + 1);
        }

        // Generate a random number for friend matches
        var lengthIndex = index.length;
        var random = Math.floor((Math.random() * lengthIndex));
        var value = index[random];

        $("#imagemodal").modal("show");
        $("#result_name").html("<h3> My Name is : " + data[value].name + "</h3>");
        $("#imagepreview").attr("src", data[value].photo);

      } else {
        console.log("No data available");
      }
    });
  }
}); //document ready