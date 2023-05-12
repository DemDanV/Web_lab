$(window).load(function () {
    //new WOW().init();
    // initialize isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });
  
    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');
  
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });
  })