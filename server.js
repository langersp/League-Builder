const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
var db;

app.use(express.static('build'));

var leagueData = {};

//update the player data
var updateTeam = function(team, team2, type) {

    var points = 0;
    var result = '';

    function processData(player, isWinningTeam) {
      for (var i = 0; i < leagueData[0].players.length; i++){
        if(player == leagueData[0].players[i].player_id) {
          if(isWinningTeam) {
            leagueData[0].players[i].points += points;
            leagueData[0].players[i].results.push(result);
          } else {
            leagueData[0].players[i].results.push('L');
          }
        }
      }

      //console.log(leagueData)


    }

    if(type == "draw") {
      points = 1;
      result = "D";
      team.map(function(player) {processData(player, true)});
      team2.map(function(player) {processData(player, true)});
    } else {
      points = 3;
      result = "W";
      team.map(function(player) {processData(player, true)});
      team2.map(function(player) {processData(player)});
    }


    var newPlayerData = leagueData[0].players;
    var newFixtureData = leagueData[0].fixtures;
    console.log(newPlayerData)
    db.collection("leagueBuilderCollection").update({"league_id":1}, { $set: {"players": newPlayerData}}, function(err, result) {
        db.collection("leagueBuilderCollection").update({"league_id":1}, { $set: {"fixtures": newFixtureData}}, function(err, result) {
       
     });
     });


 
}


app.get('/api/leaguedata', function(req, res) {
  //res.status(200).send(JSON.stringify(LEAGUEDATA));
  //res.json(leagueData);
  db.collection("leagueBuilderCollection").find().toArray(function(err, docs) {
    leagueData = docs;
    res.json(docs);
  });
});



//Create a Fixture
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/api/leaguedata/', function(req, res) {
  //console.log("Req body:", req.body);
  
  var newFixture = {};

  //set date
  var date = new Date();
  newFixture.fixture_id = leagueData[0].fixtures.length + 1;
  newFixture.date = date;
  newFixture.played = false;
  newFixture.teams = {};
  newFixture.teams.team1 = JSON.parse(req.body.team1);
  newFixture.teams.team2 = JSON.parse(req.body.team2);
  newFixture.score1 = 0;
  newFixture.score2 = 0;
  //leagueData[0].fixtures.push(newFixture);
  //res.json(leagueData);
  //newFixture = JSON.stringify(newFixture)
 // console.log(newFixture)


db.collection("leagueBuilderCollection").update({"league_id":1}, { $push:{"fixtures": newFixture}}, function(err, result) {
   // db.collection("leagueBuilderCollection").find({"fixtures.fixture_id": newFixture.fixture_id}, {"fixtures.$":1}).toArray(function(err, doc) {
   //     console.log(doc)
   //     res.json(doc);



   // });
    db.collection("leagueBuilderCollection").find().toArray(function(err, docs) {
    leagueData = docs;
    res.json(docs);
  });
});
//db.collection("leagueBuilderCollection").update({"league_id":1}, { $push:{"fixtures":{ "date": "Thu Jun 29 2017 14:24:33 GMT+0100 (GMT Summer Time)","played": false,"teams": { "team1": [ 11, 10, 3, 4, 5 ], "team2": [ 1, 7, 6, 9, 12 ] },"score1": 0,"score2": 0 }}});



  //res.json(newFixture);
  // db.collection("leagueBuilderCollection").insertOne(newFixture, function(err, result) {
  //   var newId = result.insertedId;
  //   db.collection("leagueBuilderCollection").find({_id: newId}).next(function(err, doc) {
  //     res.json(doc);
  //   });
  // });


});



// Update a Fixture
app.post('/api/updatefixture/', function(req, res) {
  //console.log("Req body:", req.body);
  //var data = JSON.parse(req.body);
  var fixtureId = req.body.fixtureid;
  var score1 = JSON.parse(req.body.score.score1);
  var score2 = JSON.parse(req.body.score.score2);

  for (var i = 0; i < leagueData[0].fixtures.length; i++){
    if(fixtureId == leagueData[0].fixtures[i].fixture_id) {
        leagueData[0].fixtures[i].score1 = score1;
        leagueData[0].fixtures[i].score2 = score2;
        leagueData[0].fixtures[i].played = true;

        if(score1 > score2) {
           updateTeam(leagueData[0].fixtures[i].teams.team1, leagueData[0].fixtures[i].teams.team2);
        } else if (score1 < score2) {
          updateTeam(leagueData[0].fixtures[i].teams.team2, leagueData[0].fixtures[i].teams.team1);
        } else  {
          updateTeam(leagueData[0].fixtures[i].teams.team1, leagueData[0].fixtures[i].teams.team2, "draw");
        }
    }
  }




  // leagueData[0].fixtures.push(newFixture);
  res.json(leagueData);
});

//connect to mongodb then start server
MongoClient.connect('mongodb://localhost/leagueBuilder', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log("Started server at port", port);
  });
});
