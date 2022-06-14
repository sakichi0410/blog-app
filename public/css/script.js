/*$(function(){ // if document is ready
  alert('jQuery is ready.')
});*/

$(function() {
  $('.delete-icon').on('click',function() {
    $('#alert-bar').fadeIn();

  $('.back-btn').on('click',function() {
    $('#alert-bar').fadeOut();
  })
  })
})
