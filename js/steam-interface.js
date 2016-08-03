$(document).ready(function(){
  $("#steam-search").submit(function(event){
    event.preventDefault();
    var gameId = $("#game-id").val();
    $.get("   http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid="+gameId+"&count=3&maxlength=300&format=json").then(function(response){
      console.log(response);
    }).fail(function(error){
      console.log(error.responseJSON.message)
    });
  });
});
