var SpotifySearch = require("./../js/spotify-search.js").searchModule;

var showAlbum = function(album) {
  console.log(album);
};

$(document).ready(function(){
  var currentSpotifySearch = new SpotifySearch();
  $("#album-search").submit(function(event){
    event.preventDefault();
    var albumSearchTerm = $("#album").val();
    currentSpotifySearch.searchAlbum(albumSearchTerm, showAlbum);
  });
});
