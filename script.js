$(function() {
    var $headerMain = $('.h-main');
    var headerTopHeight = $('.h-top').outerHeight();

    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= headerTopHeight) {
        $headerMain.addClass('fixed');
        } 
        else {
        $headerMain.removeClass('fixed');
        }
    });
});