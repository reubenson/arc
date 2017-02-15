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

function findParentElement(el, className) {
  var el = el.parentElement,
    parentFound = el && el.classList.contains(className);

  return (parentFound || !el) ? el : findParentElement(el, className);
}

function modifyTracklist() {
  // style tracklist for narrow view
  var tracklist = document.querySelector('.work-tracklist'),
    thresholdWidth = 420,
    modifyFn = function() {
      if(tracklist) {
        if (tracklist.clientWidth < thresholdWidth) {
          tracklist.classList.add('sm');
          // var playButton = tracklist.querySelector('.piece-play button');
        } else {
          tracklist.classList.remove('sm');
        }
        updateTracklist && window.clearInterval(updateTracklist);

        return null;
      }
    },
    updateTracklist = tracklist ? modifyFn() : window.setInterval(modifyFn,100);
}

//Todo: Currently modifyTracklist() is called on every page, regardless of whether or not there is a tracklist. Should only be called on pages with an AudioPlayer.

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
    setActive();
    setState(isPlaying);
  }, false);

  function setActive() {
    currentElement.classList.add('piece-active');
  }

  function removeActive() {
    prevElement.classList.remove('piece-active');
  }

  function setPlayButton(el) {
    el.querySelector('.add-piece-to-player-btn').classList.remove('fa-pause');
    el.querySelector('.add-piece-to-player-btn').classList.add('fa-play');
  }

  function setPauseButton(el) {
    el.querySelector('.add-piece-to-player-btn').classList.remove('fa-play');
    el.querySelector('.add-piece-to-player-btn').classList.add('fa-pause');
  }

  function setState(isPlaying) {
    playing = isPlaying;

    playing ? setPauseButton(currentElement) : setPlayButton(currentElement);

    if (prevElement && prevElement != currentElement) {
      removeActive();
      setPlayButton(prevElement);
    }

    prevElement = currentElement;
  }

  function setElement(el) {
    currentElement = el;
  }

  return {}
})();

// when scroll the tracklist, main content shouldn't scroll as well
// (currently behaves somewhat unpredictably - some visual indicator should indicate scroll is locked?)
$(function() {
  var tracklistContainer = document.querySelector('.work-tracklist-container');

  function fixBody() {
    document.body.style.position = 'fixed';
  }

  function unfixBody() {
    document.body.style.position = 'relative';
  }

  tracklistContainer.addEventListener('mouseenter', fixBody);
  tracklistContainer.addEventListener('mouseleave', unfixBody);
});
