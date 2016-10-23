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
  window.addEventListener('resize', func)
}

function modifyTracklist() {
  // style tracklist for narrow view
  var tracklist = document.querySelector('.work-tracklist'),
    thresholdWidth = 420;

  console.log(tracklist.clientWidth);
  if (tracklist.clientWidth < thresholdWidth) {
    tracklist.classList.add('sm');
  } else {
    tracklist.classList.remove('sm');
  }

  // console.log('test');
}

onLoadAndResize(modifyTracklist);
