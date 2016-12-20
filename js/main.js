(function() {

    $('.mobile-menu__toggle').on('click', function()
    {
        $('.mobile-menu').slideToggle();
        var currentIcon = $(this).children('img').attr('src');
        if(currentIcon == 'img/cross.png') {
            $(this).children('img').attr('src', 'img/menu.png');
        } else {
            $(this).children('img').attr('src', 'img/cross.png');
        }
    });

})();