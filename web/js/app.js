$(document).ready(function () {
    //fixed navigation from 2nd section
    $('.section-delivery').waypoint(function (direction) {
        if (direction == 'down') {
            $('nav').addClass('fixed-nav');
        }
        else {
            $('nav').removeClass('fixed-nav');
        }
    }, {
            offset: '60px'
        })

    //go to the start of page
    $('.small-logo').click(function () {
        $('html, body').animate({ scrollTop: $('.home-section').offset().top }, 1500);
    })

    //smooth scrolling snippet
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        }
        );

    //Scroll animation
    $('.js-wp-1').waypoint(function (direction) {
        $('.js-wp-1').addClass('animated fadeIn');
    }, {
            offset: '50%'
        })

    $('.js-wp-2').waypoint(function (direction) {
        $('.js-wp-2').addClass('animated fadeInUp');
    }, {
            offset: '50%'
        })

    $('.js-wp-3').waypoint(function (direction) {
        $('.js-wp-3').addClass('animated slideInUp');
    }, {
            offset: '50%'
        })

    $('.js-wp-4').waypoint(function (direction) {
        $('.js-wp-4').addClass('animated jackInTheBox');
    }, {
            offset: '50%'
        })


    /* mobile nav */
    $('.js-nav-hamburger').click(function () {
        var nav = $('.js-main-nav')

        nav.slideToggle(300);
    })
});

