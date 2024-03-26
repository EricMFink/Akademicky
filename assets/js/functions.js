window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

/*
  Handles a click on the down button to slide down the playlist.
*/
document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
  var list = document.getElementById('list');

  list.style.height = ( parseInt( document.getElementById('flat-black-player-container').offsetHeight ) - 135 ) + 'px';

  document.getElementById('list-screen').classList.remove('slide-out-top');
  document.getElementById('list-screen').classList.add('slide-in-top');
  document.getElementById('list-screen').style.display = "block";
});

/*
  Handles a click on the up arrow to hide the list screen.
*/
document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
  document.getElementById('list-screen').classList.remove('slide-in-top');
  document.getElementById('list-screen').classList.add('slide-out-top');
  document.getElementById('list-screen').style.display = "none";
});

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

document.querySelector('img[data-amplitude-song-info="cover_art_url"]').style.height = document.querySelector('img[data-amplitude-song-info="cover_art_url"]').offsetWidth + 'px';

Amplitude.init({
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [
    {
      "name": "Blues Run the Game",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/BluesRunTheGame.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "Clay Pigeons",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/ClayPigeons.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "Fireworks",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/Fireworks.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "Not Ashamed",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/NotAshamed.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "Return of the Grievous Angel",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/GrievousAngel.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "New Paint",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/NewPaint.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "True Love Will Find You in the End",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/TrueLoveWillFindYou.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
    {
      "name": "Opps, I Did It Again",
      "artist": "Ulrich Kvetcher",
      "url": "../assets/music/Oops.ogg",
      "cover_art_url": "../assets/music/AlbumCover.png"
    },
  ]
});