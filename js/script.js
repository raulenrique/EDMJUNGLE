
/*---------------------------SIDEBAR FUNCTIONS--------------------------------------*/
/*Push the body and nav over by 285px to reveal sidebar when menu element is clicked*/


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




/*---------------------GOOGLE MAPS--------------------------------*/


          // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
               
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(38.908650, 1.437419), // Ibiza

                    // styling of map
                    
                    styles: [{"featureType":"landscape","stylers":[{"visibility":"simplified"},{"color":"#2b3f57"},{"weight":0.1}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":0.4},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"weight":1.3},{"color":"#FFFFFF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":3}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":1.1}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":0.4}]},{},{"featureType":"road.highway","elementType":"labels","stylers":[{"weight":0.8},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.7}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"color":"#6c5b7b"}]},{"featureType":"water","stylers":[{"color":"#f3b191"}]},{"featureType":"transit.line","stylers":[{"visibility":"on"}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(38.908650, 1.437419),
                    map: map,
                    title: 'Our EDM JUNGLE headquarters!!'
                });

                infowindow = new google.maps.InfoWindow({
                    content: '<strong>EDM JUNGLE - Main Office<\/strong><br>Ibiza, Spain<br>'
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
                infowindow.open(map, marker);
            }




/*---------------------CONTACT FORM VALIDATION--------------------------------*/



function addFormValidation(formElement) {

  if (formElement === null || formElement.tagName.toUpperCase() !== 'FORM') {
    throw new Error("first parameter to addFormValidation must be a FORM, but got " + formElement.tagName);
  }

  formElement.noValidate = true;

  formElement.addEventListener("submit", function (evt) {
    if (!validateForm(formElement)) {
      evt.preventDefault();
    }
  });

  for (var i = 0; i < formElement.elements.length; i += 1) {
    var field = formElement.elements[i];
    field.addEventListener('blur', blurEvent);
  }

  /* FUNCTIONS */

  function blurEvent(evt) {
    validateField(evt.target);
  }

  function validateForm(formElement) {
    var error = false;

    for (var i = 0; i < formElement.elements.length; i += 1) {
      var isValid = validateField(formElement.elements[i]);
      if ( ! isValid) { 
        error = true;
      }
    }

    return !error;
  }


  function validateField(el) {
    var error = "";

    if (['submit', 'reset', 'button', 'hidden', 'fieldset'].indexOf(el.type) > -1) {
      return true; // buttons and fieldsets are automatically valid.
    }

    if (el.id.length === 0 || el.name.length === 0) {
      console.error("error: ", el);
      throw new Error("found a form element that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
    }

    // find this element's match error div.
    var errorDiv = document.querySelector("#" + el.id + "-error");
    if (errorDiv === null) {
      console.error("error: ", el);
      throw new Error("could not find the '#" + el.id + "-error' element. It's needed for error messages if #" + el.id + " is ever invalid.");
    }

    errorDiv.innerHTML = "";

    el.classList.remove('invalid');
    errorDiv.classList.remove('danger');

    if (el.type === "email" && el.value.length >= 1 && !isEmail(el.value)) {
      error = "please provide a valid email address.";
    }

    if (hasMinLength(el) && el.value.length < el.minLength) {
      error = "must be " + el.minLength + " or more characters long.";
    }

    if (hasMaxLength(el) && el.value.length > el.maxLength) {
      error = "must be " + el.maxLength + " or less characters long.";
    }

    if (hasMin(el) && parseInt(el.value, 10) < parseInt(el.min, 10)) {
      error = "must be " + el.min + " or greater.";
    }

    if (hasMax(el) && parseInt(el.value, 10) > parseInt(el.max, 10)) {
      error = "must be " + el.max + " or less.";
    }

    if (el.dataset.fvMatch) { // data-fv-match="..."
      var matchingEl = document.querySelector('#' + el.dataset.fvMatch);
      if (matchingEl === null) {
        console.error("error: ", el);
        throw new Error("Couldn't find the field '#" + el.dataset.fvMatch + "' to check #" + el.id + " against.");
      }
      if (el.value !== matchingEl.value) {
        error = "The two fields must match.";
      }
    }

    // is this field required?
    if (el.type === "checkbox" && el.required && !el.checked) { 
      error = "this must be checked.";
    } else if (isRequired(el) && el.value.trim().length === 0) {
      error = "this field is required.";
    }

    if (error !== "") {
      errorDiv.innerHTML = error;
      
      el.classList.add('invalid');
      errorDiv.classList.add('danger');

      return false; // it's invalid
    }

    return true;
  }

  function isEmail(input) {
    return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
  }

  function hasMinLength(el) {
    return (minMaxLengthApplies(el) && el.minLength > 0);
  }

  function hasMaxLength(el) {
    return (minMaxLengthApplies(el) && el.maxLength > -1);
  }

  function hasMin(el) {
    return (numericMinMaxApplies(el) && el.min > 0);
  }

  function hasMax(el) {
    return (numericMinMaxApplies(el) && el.max > -1);
  }

  function isRequired(el) {
    return (requiredApplies(el) && el.required);
  }

  function minMaxLengthApplies(el) {
    return ['text', 'search', 'url', 'tel', 'email', 'password', 'textarea'].indexOf(el.type) > -1;
  }

  function numericMinMaxApplies(el) {
    return ['number', 'range'].indexOf(el.type) > -1;
  }

  function requiredApplies(el) {
    return ['text', 'search', 'url', 'tel', 'email', 'password', 'datetime', 'date', 'month', 'week', 'time', 'number', 'file', 'textarea', 'select-one'].indexOf(el.type) > -1;
  }

}