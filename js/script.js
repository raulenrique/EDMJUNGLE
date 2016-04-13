var main = function() {
  /* Push the body and the nav over by 285px */
  $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });
};


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
    } // This shouldn't happen.

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

