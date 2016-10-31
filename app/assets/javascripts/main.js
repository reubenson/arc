$(function(){
  $(document).pjax('a', '#main');
  // might consider shifting to https://github.com/thybag/PJAX-Standalone to remove jquery dep

  // $('#main').on('click', function(e) {
  document.getElementById('main').addEventListener('click', function(e){
    if (e.target.className == 'toggle-piece-description-btn') {
      _pieceDescription = e.target.parentNode.parentNode.nextElementSibling;
      if (_pieceDescription.getAttribute('aria-hidden') == 'true') {
        e.target.innerHTML = 'Hide Description';
        _pieceDescription.setAttribute('aria-hidden', 'false');
      } else {
        e.target.innerHTML = 'Show Description';
        _pieceDescription.setAttribute('aria-hidden', 'true');
      }
    }
  })
});

function onLoadAndResize(func) {
  window.addEventListener('load', func);
  window.addEventListener('resize', func);
  $(document).on('pjax:complete', func);
}

function findParentElement(e,className) {
  var _el = e.target.parentElement;
  while (!_el.classList.contains(className)) {
    _el = _el.parentElement;
  }
  return _el;
}

function modifyTracklist() {
  // style tracklist for narrow view
  var tracklist = document.querySelector('.work-tracklist'),
    thresholdWidth = 420,
    modifyFn = function() {
      var tracklist = document.querySelector('.work-tracklist');
      if (tracklist.clientWidth < thresholdWidth) {
        tracklist.classList.add('sm');
        // var playButton = tracklist.querySelector('.piece-play button');
      } else{
        tracklist.classList.remove('sm');
      }
      updateTracklist && window.clearInterval(updateTracklist);

      return null;
    },
    updateTracklist = tracklist ? modifyFn() : window.setInterval(modifyFn,100);
}

onLoadAndResize(modifyTracklist);


// recieve custom events dispatched from the PlayButton React component
// update UI state dynamically
var playButton = (function() {
  var playing = false,
    currentElement,
    prevElement;

  window.addEventListener('audio:updated', function(e){
    var el = document.querySelector('.piece[data-pieceid="'+e.detail.pieceId+'"]'),
      isPlaying = e.detail.isPlaying;

    setElement(el);
    setState(isPlaying);
  }, false);

  function setState (isPlaying) {
    playing = isPlaying;
    currentElement.querySelector('.add-piece-to-player-btn').innerHTML = isPlaying ? '&#9614;&#9614;' : '&#9658';
    if (prevElement && prevElement != currentElement) {prevElement.querySelector('.add-piece-to-player-btn').innerHTML = '&#9658';}
    prevElement = currentElement;
  }

  function setElement (el) {
    currentElement = el;
  }

  return {}
})();
