
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


    function addFormValidation(theForm) {

       if (theForm === null || theForm.tagName.toUpperCase() !== 'FORM') {
           throw new Error("first parameter to addFormValidation must be a FORM, but got " + theForm.tagName);
       }
       theForm.noValidate = true;

       theForm.addEventListener('submit', function(evt) {
           if(validateForm(theForm) === false){
               evt.preventDefault();
           }
       });

       function validateForm(theForm){
           var isError = false;
           var elements = theForm.elements;
            for (var i = 0; i < elements.length; i += 1) {
               var isValid = isFieldValid(elements[i]);
                if(isValid === false){
                       isError = true;
                   }      
            }
            return ! isError;
       }

       function isFieldValid(field) {
           var errorMsg = "";

           if (! needsToBeValidated(field)) {
               return true;
           }

           if (field.id.length === 0 || field.name.length === 0) {
           console.error("error: ", field);
           throw new Error("found a field that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
           }
           var errorSpan = document.querySelector('#' + field.id + '-error');
           
           if (errorSpan === null) {
               console.error("error: ", field);
               throw new Error("could not find the '#" + field.id + "-error' element. It's needed for error messages if #" + field.id + " is ever invalid.");
           }
           
           field.classList.remove('invalid');
           errorSpan.classList.remove('danger');
           errorSpan.innerHTML = "";

           // number check

           if(field.type === "number" & field.min > 0 && parseInt(field.value, 10) < parseInt(field.min, 10) ){
            errorMsg = "must be" + field.min + "or greater.";
          }

          if(field.type === "number" & field.max > 0 && parseInt(field.value, 10) < parseInt(field.max, 10)){
            errorMsg = "must be" + field.max + "or less.";
          }

        
          // email check ------------------------------------------------------------------------------------

          if(field.type ==="email" && ! isEmail(field.value)){
           errorMsg= "****";
          }
          
           // Min and Max length check----------------------------------------------------------------------
           
           if(field.minLength > 0 && field.value.length < field.minLength){
               errorMsg = "Must be " + field.minLength + " or more characters long.";
           }

           if(field.maxLength > 0 && field.value.length > field.maxLength){
               errorMsg = "Must be " + field.maxLength + " characters or less.";

           }
          
           // If this field is required---------------------------------------------------------------------

          if(field.type === "checkbox" && ! field.checked) { 
               errorMsg = "This must be checked.";
           } else if(field.required && field.value.trim() === "") {
                     errorMsg = "****"; 
          }

           if(errorMsg !== ""){  
               errorSpan.innerHTML = errorMsg;    
               field.classList.add('invalid');
               errorSpan.classList.add('danger');

               return false; //we found the error and so it is invalid
           }

           return true;
       }

       function needsToBeValidated(field){
           return ['submit', 'reset', 'button', 'hidden', 'fieldset'].indexOf(field.type) === -1;
       }
       function isEmail(input) {
           return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
       }

    }

