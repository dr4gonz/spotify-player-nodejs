
SpotifySearch = function() {};

SpotifySearch.prototype.searchAlbum = function(searchParameter, showAlbum, artistDisplay) {
  var that = this;
  $.get("https://api.spotify.com/v1/search?q="+searchParameter+"&limit=10&type=album").then(function(response){
    console.log(response);
    for (i = 0; i< response.albums.items.length; i++) {
      showAlbum(response.albums.items[i]);
      that.getArtist(response.albums.items[i].id, artistDisplay);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

SpotifySearch.prototype.searchArtist = function(searchParameter, showArtist, albumDisplay) {
  var that=this;
  $.get("https://api.spotify.com/v1/search?q="+searchParameter+"&limit=1&type=artist").then(function(response){
    console.log(response);
    showArtist(response.artists.items[0]);
    that.getAlbums(response.artists.items[0].id, albumDisplay);
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

SpotifySearch.prototype.getAlbums = function(artistId, albumDisplay) {
  $.get("https://api.spotify.com/v1/artists/"+artistId+"/albums?limit=10&album_type=album").then(function(response){
    console.log(response);
    for(i = 0; i < response.items.length; i++) {
      albumDisplay(response.items[i]);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};



exports.searchModule = SpotifySearch;
//search for artist
//find artists albums by artist id
