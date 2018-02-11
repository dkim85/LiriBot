const keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


// create a function only when Twitter is called, not automatically run

var getMyTweets = function () {

		var client = new Twitter(keys.twitterKeys);

		var params = { screen_name: 'kimchibcha' };
		client.get('statuses/user_timeline', params, function (error, tweets, response) {
			if (!error) {
				// console.log(tweets);
				// display specific attributes such as text associated and date
				for(var i=0; i<tweets.length; i++) {
					console.log(tweets[i].created_at);
					console.log(' ');
					console.log(tweets[i].text);
				}
			}
		});
}

// Spotify
var getArtistsNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {
    // console.log(searchedSong);

			var spotify = new Spotify(keys.spotifyKeys);
						
		spotify.search({ type: 'track', query: songName }, function(err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
					}
				var songs = data.tracks.items;
				for (var i=0; i<songs.length; i++) {
				console.log(i);
				console.log('artist(s): ' + songs[i].artists.map(
					getArtistsNames));
				console.log('song name: ' + songs[i].name);
				console.log('preview song: ' + songs[i].preview_url);
				console.log('album: ' + songs[i].album.name);
				console.log('---------------------------------------');
				}
		});
}
	// Switch statement to hold different arguments

var pick = function(caseData, functionData) {
		switch(caseData) {
			case "my-tweets" :
						getMyTweets();
						break;
			case 'spotify-this-song':
						getMeSpotify(functionData);
						break;
			default:
			console.log('LIRI is dumb, cant recognize this');
		}
}

var runThis = function(argOne, argTwo) {
		pick(argOne, argTwo);
};
// [0=node]; [1=liri]; [2=my-tweets]; [3=name of a movie]
runThis(process.argv[2], process.argv[3]);