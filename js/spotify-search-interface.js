var SpotifySearch = require("./../js/spotify-search.js").searchModule;

var showAlbum = function(album) {
  console.log(album);
  var albumId = album.id;
  $("#spotify-results").append("<img src='"+album.images[2].url+"'><li id='album"+albumId+"'><a  class='widget-link'>"+album.name+"</a> - <span id='artist-field"+albumId+"'</li>");

  $('#album'+albumId).click(function(){
    console.log(albumId);
    $("#player-widget").empty();
    $("#player-widget").append('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + albumId + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
  });
};

var artistDisplay = function(albumId, artistName) {
  console.log(artistName);
  $("#artist-field"+albumId).text(artistName);
};

var showArtist = function(artist) {
  console.log(artist);
  var artistId = artist.id;
  $("#artist-image").append("<h3>"+artist.name+"</h3><img src='"+artist.images[2].url+"'>");
};

var albumDisplay = function(album) {
  console.log(album);
  $("#spotify-results").append("<img src='"+album.images[2].url+"'><li id='album"+album.id+"'><a  class='widget-link'>"+album.name+"</a></li>");

  $('#album'+album.id).click(function(){
    console.log(album.id);
    $("#player-widget").empty();
    $("#player-widget").append('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + album.id + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
  });
};

$(document).ready(function(){

  var currentSpotifySearch = new SpotifySearch();

  $("#album-search").submit(function(event){
    event.preventDefault();
    $("#spotify-results").empty();
    $("#artist-image").empty();
    var albumSearchTerm = $("#album").val();
    currentSpotifySearch.searchAlbum(albumSearchTerm, showAlbum, artistDisplay);
  });
  $("#artist-search").submit(function(event){
    event.preventDefault();
    $("#spotify-results").empty();
    $("#artist-image").empty();
    var artistSearchTerm = $("#artist").val();
    currentSpotifySearch.searchArtist(artistSearchTerm, showArtist, albumDisplay);
  });


});
