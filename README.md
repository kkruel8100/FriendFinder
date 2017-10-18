# FriendFinder

This is a compatibility-based "FriendFinder" application utilizing Node and Express Servers. The full-stack site takes in results from users' surveys, then compares the answers with those from other users already in the database. The app will display the name and picture of the user with the best overall match.

## Deployed on Heroku at:

## Folder structure:

FriendFinder
*	app
	* data
		* friends.js
	* public
		* home.html
		* survey.html
	* routing
		* apiRoutes.js
		* htmlRoutes.js
* node_modules
* package.json
* server.js

##Overview:

* Survey contains 10 questions. Each answer is on a scale of 1 to 5 based on whether user agrees or disagrees with a question.  
* Server.js file require the npm packages: express, body-parser and path.
* HtmlRoutes.js file contains two routes:
	* A GET route to /survey.  This will display the survey page.
	* A default, catch-all route that leads to home.html which displays the home page. 
* ApiRoutes.js file contains two routes:
	* A GET route to /api/friends. This will display a JSON of all possible friends.
	* A POST route /api/friends. 
* The application's data is inside of app/data/friends.js as an array of objects. Each of these objects has the format below.

{
  "name":"Username",
  "photo":"https://.......jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}

* The user's most compatible friend is determined using the following logic:
	* The user's results are converted into an array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
	* Each existing database friend entry has their results converted into an array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
	* The user's scores are compared against the other users, question by question.
	* The absolute value is calculated for each difference.
	* The differences are added to calculate the totalDifference.

Example: 

User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]

User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]

Total Difference: 2 + 1 + 2 = 5

  * The closest match is determined by the lowest difference.
  * All matches with the same difference are pushed into an array.  This captures if there is more than one match found.
  * A random number is generated and used to pick one from the multiple matches. 
  * The result displays as a modal pop-up and shows the name and picture of the 


