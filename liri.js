var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

// functions ~~~ Twitter

var getMyTweets = function() {
 
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

// functions ~~~ Spotify
 
var getMeSpotify = function(songName) {
 
	spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	  if (err) {
	    console.log('Error occurred: ' + err);
	    return;
	  }
	 
	console.log(data.tracks.items[0]); 
	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break;
		case 'spotify-this-song' :
			getMeSpotify(functionData);
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


