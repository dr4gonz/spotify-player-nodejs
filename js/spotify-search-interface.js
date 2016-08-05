var SpotifySearch = require("./../js/spotify-search.js").searchModule;
var oAuthId = require("./../.env").oAuthId;

OAuth.initialize(oAuthId);

var showAlbum = function(album) {
  console.log(album);
  var albumId = album.id;
  $("#spotify-results").append("<li class='album-list-item list-group-item' id='album"+albumId+"'><a class='widget-link'><img class='album-img-thumb' src='"+album.images[2].url+"'>"+album.name+"</a> - <span id='artist-field"+albumId+"'</li>");

  $('#album'+albumId).click(function(){
    console.log(albumId);
    $("#player-widget").empty();
    $("#player-widget").append('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + albumId + '" width="400" height="500" frameborder="0" allowtransparency="true"></iframe>');
  });
};

var artistDisplay = function(albumId, artistName) {
  console.log(artistName);
  $("#artist-field"+albumId).text(artistName);
};

var showArtist = function(artist) {
  console.log(artist);
  var artistId = artist.id;
  $("#artist-image").append("<h3>"+artist.name+"</h3><img class='center-block' src='"+artist.images[2].url+"'>");
};

var albumDisplay = function(album) {
  console.log(album);
  $("#spotify-results").append("<li class='album-list-item list-group-item' id='album"+album.id+"'><a class='widget-link'><img class='album-img-thumb' src='"+album.images[2].url+"'>"+album.name+"</a></li>");

  $('#album'+album.id).click(function(){
    console.log(album.id);
    $("#player-widget").empty();
    $("#player-widget").append('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + album.id + '" width="400" height="500" frameborder="0" allowtransparency="true"></iframe>');
  });
};

var spotifyLogIn = function() {
  OAuth.popup('spotify')
  .done(function(result) {
    console.log(result);
    result.get('https://api.spotify.com/v1/me/albums?limit=10')
    .done(function (response) {
      console.log(response);
      for (i = 0; i< response.items.length; i++) {
        showAlbum(response.items[i].album);
      }
    })
    .fail(function (err) {
      console.log(err);
    });
  })
  .fail(function (err) {
    console.log(err);
  });
};

$(document).ready(function(){

  var currentSpotifySearch = new SpotifySearch();
  $("#btn-login").click(function(){
    spotifyLogIn();
  });
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
