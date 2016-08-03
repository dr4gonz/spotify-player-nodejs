var SpotifySearch = require("./../js/spotify-search.js").searchModule;

var showAlbum = function(album) {
  console.log(album);
  var albumId = album.id
  $("#spotify-results").append("<img src='"+album.images[2].url+"'><li id='album"+albumId+"'><a  class='widget-link'>"+album.name+"</a></li>");

  $('#album'+albumId).click(function(){
    console.log(albumId);
    $("#player-widget").empty();
    $("#player-widget").append('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + albumId + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
  });
};

$(document).ready(function(){

  var currentSpotifySearch = new SpotifySearch();

  $("#album-search").submit(function(event){
    event.preventDefault();
    var albumSearchTerm = $("#album").val();
    currentSpotifySearch.searchAlbum(albumSearchTerm, showAlbum);
  });


});
