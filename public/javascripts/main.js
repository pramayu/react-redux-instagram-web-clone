$(document).ready(function() {
  $('.this_list li:gt(0)').hide();
  setInterval(function() {
    $('.this_list > :first-child').fadeOut(2000).next('li').fadeIn(2000).end().appendTo('.this_list');
  }, 8000);
})
