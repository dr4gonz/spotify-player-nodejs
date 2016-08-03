SpotifySearch = function() {};

SpotifySearch.prototype.searchAlbum = function(searchParameter, showAlbum, artistDisplay) {
  var that = this;
  $.get("https://api.spotify.com/v1/search?q="+searchParameter+"&type=album").then(function(response){
    console.log(response);
    var upperLimit;
    if (response.albums.items.length > 10) upperLimit = 10;
    else upperLimit = response.albums.items.length;
    for (i = 0; i< upperLimit; i++) {
      showAlbum(response.albums.items[i]);
      that.getArtist(response.albums.items[i].id, artistDisplay);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

SpotifySearch.prototype.getArtist = function(albumId, artistDisplay) {
  $.get("https://api.spotify.com/v1/albums/"+albumId).then(function(response){
    console.log(response);
    artistDisplay(albumId, response.artists[0].name);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.searchModule = SpotifySearch;
