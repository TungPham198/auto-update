import $ from 'jquery';

// document.querySelector(".dropdown").addEventListener('click', function (event) {
//   console.log(123)
// })

$(document).ready(function () {
  $(document).on('click', '.dropdown', function (e) {
    if (!$(this).children().hasClass('show')) {
      $(document).find('.dropdown').children().removeClass('show');
      $(this).children().toggleClass('show');
    }
    e.stopPropagation();
  })

  $(function () {
    $(document).click(function (e) {
      $(document).find('.dropdown').children().removeClass('show');

      if (!$(e.target).is('.card-body') && !$(e.target).is('#search_box') ) {
        $('.toggle-search').removeClass("active"); //hide the button
        $('.search-wrap').removeClass("active"); //hide the button
        $('.search-back').removeClass("active"); //hide the button
      }
    });
  });

  $(document).on('click', '.toggle-search', function (e) {
    let a = $(document).find('.search-wrap');
    if (!$(this).hasClass('active')) {
      $(this).toggleClass('active');
      a.toggleClass('active');
      a.find('.search-back').toggleClass('active');
      $('#search_box').focus();
    }
    e.stopPropagation();
  })



  $(document).on('click', '#nav-menu-advance>span', function (e) {
    $('#nav-menu-advance').toggleClass('hover show');
    $('.nav-sub-menu-advance').toggleClass('hiden-menu-create show')
  });

//   $(document).on('change', '[type="file"]', function (e) {
//     let value = $(this).val();
//     let idInput = $(this).attr('id');
//     $('label[for="'+idInput+'"]').html(value.replace('C:\\fakepath\\',''));
//   });

});
