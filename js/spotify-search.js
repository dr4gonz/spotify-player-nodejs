SpotifySearch = function() {};

SpotifySearch.prototype.searchAlbum = function(searchParameter, showAlbum) {
  $.get("https://api.spotify.com/v1/search?q="+searchParameter+"&type=album").then(function(response){
    console.log(response);
    var upperLimit;
    if (response.albums.items.length > 10) upperLimit = 10;
    else upperLimit = response.albums.items.length;
    for (i = 0; i< upperLimit; i++) {
      showAlbum(response.albums.items[i]);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

// SpotifySearch.prototype.getArtist = function(queryParameter, artistDisplay) {
//   $.get(queryParameter).then(function(response){
//
//   }).fail(function(error){
//
//   });
// }

exports.searchModule = SpotifySearch;
