var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// functions ~~~ Twitter

var getMyTweets = function() {
 console.log("getmytweets()")
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'kimchibcha'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for(var i=0; i<tweets.length; i++){
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});
}

// function Spotify ~~~~

var getArtistNames = function(artist) {
	return artist.name;
}
 
var getMeSpotify = function(songName) {

	var spotify = new Spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
	})
 
	spotify.search({ type: 'track', query: 'mi gente' }, function(err, data) {
	  if (err) {
	    console.log('Error occurred: ' + err);
	    return;
	  }
	 
	  var songs = data.tracks.items;
	  for(var i=0; i<songs.length; i++) {
	  	  console.log(i);
	  	  console.log('artist(s): ' + songs[i].artist.map(getArtistNames));
	  	  console.log('song name: ' + songs[i].name);
	  	  console.log('preview song: ' + songs[i].preview_url);
	  	  console.log('album: ' + songs[i].album.name);
	  	  console.log('----------------------------------------------');
	  }
	});
}

// function request ~~~~~

var getMeMovie = function(movieName){

	request('http://www.omdbapi.com/?t=', function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.
	  var jsonData = JSON.parse(body);
	   console.log('Title: ' + jsonData.Title);
	   console.log('Year: ' + jsonData.Year);
	   console.log('Rated: ' + jsonData.Rated);
	   console.log('IMDB Rating: ' + jsonData.imbdRating);
	   console.log('Country: ' + jsonData.Country);
	   console.log('Language: ' + jsonData.Language);
	   console.log('Plot: ' + jsonData.Plot);
	   console.log('Actors: ' + jsonData.Actors);
	});
}

// fs.file
var doWhatItSays = function () {
	fs.readFile('random.txt', 'utf8', function (err, data) {
	  if (err) throw err;
	  console.log(data);

	  var dataArr = data.split('.');

	  if (dataArr.length == 2) {
	  	pick(dataArr[0]. dataArr[1]);	
	  } else if (dataArr.length ==1) {
	  	pick(dataArr[0]);
	  }

	});
}

var pick = function(caseData, functionData) {
	// console.log("swith stament")
	switch(caseData) {
		case 'my-tweets' :
		// console.log("my-tweets")
			getMyTweets();
			break;
		case 'spotify-this-song' :
			getMeSpotify(functionData);
			break;
		case 'movie-this' :
			getMeMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	// console.log("run this!")
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


