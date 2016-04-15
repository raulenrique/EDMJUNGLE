
/*---------------------------SIDEBAR FUNCTIONS--------------------------------------*/
/*Push the body and nav over by 285px to reveal sidebar when menu element is clicked*/
// var main = function() {
//     $(".icon-menu").click(function() {
//         $("#sidebar").animate({
//             left: "0px"
//         }, 200), $("body").animate({
//             left: "285px"
//         }, 200)
//     }), 
// /*...and then 'hide' sidebar when close element is clicked */ 
//     $(".icon-close").click(function() {
//         $("#sidebar").animate({
//             left: "-285px"
//         }, 200), $("body").animate({
//             left: "0px"
//         }, 200)
//     }), 
// /*...also hide side bar when link is clicked to reveal 100% of page */ 
//     $("#sidebar li").click(function() {
//         $("#sidebar").animate({
//             left: "-285px"
//         }, 200), $("body").animate({
//             left: "0px"
//         }, 200)
//     })
// };



var main = function() {
  $('.icon-menu').click(function() {
    $('#sidebar').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* Then push them back */
  $('.icon-close').click(function() {
    $('#sidebar').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });

/* Then push them back */
  $('#sidebar li').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });


};

/*---------------------PREVIOUS NEXT SECTION USING KEYBOARD--------------------------------*/


$(document).ready(main);

jQuery(function($) {

    var $sections = $('.section'),
        $animContainer = $('html, body'),
        $document = $(document),
        numSections = $sections.length,
        currSection = 0,
        isAnimating = false;

    // Animate to a specific index.
    var gotoSection = function(index) {
        isAnimating = true;
        $animContainer.animate({
            scrollTop: $sections.eq(index).offset().top
        }, 750, function() {
            isAnimating = false;
        });
    };

    // Advance to next or previous section.
    var handleAction = function(direction) {
        if (isAnimating) {
            return false;
        }

        if (direction === 'prev' && currSection > 0) {
            currSection--;
        } else if (direction === 'next' && currSection < numSections - 1) {
            currSection++;
        } else {
            return false;
        } 
        gotoSection(currSection);
    };

    // Handle clicks.
    $document.on('click', '.action', function() {
        handleAction($(this).data('direction'));
    });

    // Handle keyboard input.
    $document.keyup(function(e) {
        if (e.keyCode === 38) {
            handleAction('prev');
        } // Up arrow.
        if (e.keyCode === 40) {
            handleAction('next');
        } // Down arrow.
    });

});



/*---------------------CONTACT FORM VALIDATION--------------------------------*/

