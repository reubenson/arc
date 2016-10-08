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
