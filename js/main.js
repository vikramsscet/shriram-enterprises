; (function () {

    'use strict';

    var carousels = function () {
        jQuery(".owl-carousel1").owlCarousel(
            {
              loop:true, //make it true
              center: true,
              margin:0,
              responsiveClass:true,
              nav:false,
              responsive:{
                  0:{
                      items:1,
                      nav:false
                  },
                  600:{
                      items:1,
                      nav:false
                  },
                  1000:{
                      items:1,
                      nav:true,
                      loop:false
                  }
              }
          }
          );
        
          jQuery(".owl-carousel2").owlCarousel(
            {
              loop:true,
              center: true,
              margin:30,
              responsiveClass:true,
              autoHeight: false,
              nav:true,
              responsive:{
                  0:{
                      items:1,
                      nav:true
                  },
                  600:{
                      items:1,
                      nav:true,
                      margin:10,
                      center: false,
                  },
                  1000:{
                      items:1,
                      nav:true,
                      loop:true
                  }
              }
          }
          );
    }

    var isotope1 = function () {
        var $container = $('.projectContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.projectFilter a').click(function () {
            $('.projectFilter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    };

    var isotope2 = function () {
        var $container = $('.clientContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.clientFilter a').click(function () {
            $('.clientFilter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('client-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    };


    /* var isotope = function () {
        var $container = $('.portfolioContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.projectFilter a').click(function () {
            $('.projectFilter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
        $('.clientFilter a').click(function () {
            $('.clientFilter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('client-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    }; */

    var navbar = function () {
        $(window).scroll(function () {
            $("nav.navbar").offset().top > -70 ? $(".navbar-fixed-top").addClass("top-nav-collapse") : $(".navbar-fixed-top").removeClass("top-nav-collapse")
        }),
        $(function () {
            $("a.page-scroll").bind("click", function (a) { var o = $(this); $("html, body").stop().animate({ scrollTop: $(o.attr("href")).offset().top - 58 }, 1e3), a.preventDefault()
        })
        });
    };

    (function ($) {
        carousels();
        isotope1();
        isotope2();
        navbar();
    })(jQuery);
    (function (){
        document.getElementById("epc").click();
        document.getElementById("cement").click();
    })();

}());
let projectDetails = {
    epc: {
        height: 0
    },
    electrical: {
        height: 0
    },
    mechanical: {
        height: 0
    }
}
let isMobile = window.innerWidth < 500 ? true : false;
function getHeight(type, className){
    let height = 0;
    let containerHeight = 0;
    let visibleCards = [];
    let projectObjArr = document.getElementsByClassName(className);
    for (var i = 0; i < projectObjArr.length; i++) {
        if (projectObjArr[i].style.display != "none") {
            height = projectObjArr[i].offsetHeight;
            containerHeight = containerHeight + height;
            visibleCards.push(projectObjArr[i]);
        }
    }
    if(!isMobile){
        let cardsPerRow = parseInt(window.innerWidth/visibleCards[0].offsetWidth);
        let totalRows = parseInt(visibleCards.length/cardsPerRow)+(visibleCards.length%cardsPerRow === 0 ? 0 : 1);
        containerHeight = visibleCards[0].offsetHeight*totalRows;
    }
    if(type === 'images/arrows-down.png'){
        if(isMobile){
            height = visibleCards[0].offsetHeight + visibleCards[1].offsetHeight + visibleCards[2].offsetHeight;
        }
        
    }else{
        height = containerHeight
    }
    return height;
}
function formatProjects(e){
    let projectId = e.target.id;
    setTimeout(() => {
        if(projectDetails[projectId].height === 0){
            projectDetails[projectId].height = getHeight('images/arrows-down.png', projectId);
        }
        if (document.getElementById("projectContainer").offsetHeight < 400) {
            document.getElementsByClassName('scroll-button')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('scroll-button')[0].style.display = 'block';
            showMoreLess(e.target && e.target.id);
        }
    },300)
    
}
function showMoreLess(className){
    let arrowDirection = 'images/arrows-down.png';
    if(typeof(className) === "object"){
        className = document.getElementById('projectFilters').querySelector(".active").id;
        let els = document.getElementsByClassName(className);
        for (var i = isMobile ? 3 : 4; i < els.length; i++) {
            if(els[i].style.display === 'none'){
                arrowDirection = 'images/arrows-up.png';
                els[i].style.display = 'block'
            }else{
                arrowDirection = 'images/arrows-down.png';
                els[i].style.display = 'none';
            }
        }
        if(arrowDirection === 'images/arrows-down.png'){
            document.getElementById('nav-project').click();
        }
        document.getElementById('projectContainer').style.height = `${getHeight(arrowDirection, className)}px`;
        document.getElementsByClassName('page-scroll')[0].firstElementChild.src = arrowDirection;
    }else{
        document.getElementsByClassName('page-scroll')[0].firstElementChild.src = arrowDirection;
        document.getElementById('projectContainer').style.height=`${getHeight(arrowDirection, className)}px`/* '380px' */;
        let els = document.getElementsByClassName(className);
        for (var i = isMobile ? 3 : 4; i < els.length; i++) {
            els[i].style.display='none';
        }
    }
}
