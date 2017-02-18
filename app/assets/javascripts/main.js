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

// when scrolling the tracklist, main content shouldn't scroll as well
// (currently behaves somewhat unpredictably - some visual indicator should indicate scroll is locked?)
(function TracklistContainer() {
  var tracklistContainer,
    main,
    viewportMin = 1024,
    scrollY = window.scrollY,
    navbar;

  window.addEventListener('load', addEventListener);
  $(document).on('pjax:complete', addEventListener);

  function fixBody() {
    navbar = navbar || document.querySelector('.navbar');
    console.log('navbar', navbar);
    scrollY = window.scrollY;
    main.style.position = 'fixed';
    document.body.style.transform = 'translateY(-' + scrollY + 'px)';
    navbar.style.transform = 'translateY(' + scrollY + 'px)';
  }

  function unfixBody() {
    document.body.style.transform = '';
    main.style.position = 'relative';
    navbar.style.transform = '';
    window.scrollTo(0, scrollY);
  }

  function addEventListener(){
    tracklistContainer = document.querySelector('.work-tracklist-container');
    main = document.getElementById('main');

    if (tracklistContainer && window.innerWidth >= viewportMin) {
      tracklistContainer.addEventListener('mouseenter', fixBody);
      tracklistContainer.addEventListener('mouseleave', unfixBody);
    }
  }
})();

// toggle additional content on a works page via content nav
(function ContentNav(){
  var contentNav,
    contentNavItems,
    credits,
    notes,
    currentlyDisplaying,
    activeNavItem,
    viewportMin = 1024;

  window.addEventListener('load', init);
  $(document).on('pjax:complete', init);

  function handleClick(e){
    var target = e.target,
      content;

    while (!target.classList.contains('work-content-nav-item')) {
      target = target.parentElement;
    }

    activeNavItem.classList.remove('active');
    target.classList.add('active');
    content = target.getAttribute('data-content');

    hideOldContent();
    showNewContent(content);
    activeNavItem = target;
  }

  function hideOldContent(){
    currentlyDisplaying.style.display = 'none';
  }

  function showNewContent(content){
    var newContent;

    if (content === 'credits') {
      newContent = credits;
    } else if (content === 'notes') {
      newContent = notes;
    }

    newContent.style.display = 'block';
    currentlyDisplaying = newContent;
  }

  function init(){
    contentNav = document.querySelector('.work-content-nav');

    if (!contentNav || window.innerWidth < viewportMin) {
      return;
    }

    contentNavItems = contentNav.querySelectorAll('.work-content-nav-item');
    credits = document.querySelector('.work-credits-container');
    notes = document.querySelector('.work-description-container');
    currentlyDisplaying = credits;
    activeNavItem = contentNavItems[0];

    notes.style.display = 'none';
    contentNav.addEventListener('click', handleClick);
    activeNavItem.classList.add('active');
  }
})();
