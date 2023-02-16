$(document).ready(function () {
  
  //Function for checking if quantity is invalid, return error if it is.
  const errorCheck = function(className) {
    const quantity = Number($(`.${className}`).val());
    if ((Number.isNaN(quantity)) || quantity < 1) {
      return false;
    }
    return true;
  }
  //Counter for items in cart
  let cartCounter = 0;
  const errorMessage = '<p class="error-message">Error: Invalid number detected. Please try again.</p>'
  const successMessage = '<p class="success-message">Successfully added to cart</p>'
  
  
  //Event handler for miso soup add to cart
  $(".miso-soup-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    //Error check
    if (errorCheck('miso-soup-quantity') === false) {
      $('.miso-soup-price').prepend(errorMessage);
      return false;
    }
    //Grab quantity and add it to cart.
    const quantity = Number($(".miso-soup-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);

    //Add item and quantity to local storage.
    localStorage.setItem("1", quantity);
    $(".miso-soup-quantity").val("");
    $('.miso-soup-price').prepend(successMessage);
  });


  //Event handler for onigiri add to cart.
  $(".onigiri-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();
    
    //Error check
    if (errorCheck('onigiri-quantity') === false) {
      $('.onigiri-price').prepend(errorMessage);
      return false;
    }

    //Grab quantity and add it to cart
    const quantity = Number($(".onigiri-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".onigiri-quantity").val("");

    //Add item and quantity to local storage.
    localStorage.setItem("2", quantity);
    $('.onigiri-price').prepend(successMessage);
  });


  //Event handler for chilled tofu add to cart
  $(".tofu-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();
    
    //Error check
    if (errorCheck('tofu-quantity') === false) {
      $('.tofu-price').prepend(errorMessage);
      return false;
    }

    const quantity = Number($(".tofu-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".tofu-quantity").val("");
    //add item and quantity to local storage
    localStorage.setItem("3", quantity);
    $('.tofu-price').prepend(successMessage);
  });


  $(".adamame-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    //Error check
    if (errorCheck('adamame-quantity') === false) {
      $('.adamame-price').prepend(errorMessage);
      return false;
    }

    const quantity = Number($(".adamame-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".adamame-quantity").val("");
    //Add item and quantity to local storage
    localStorage.setItem("4", quantity);
    $('.adamame-price').prepend(successMessage);
  });




  $(".california-rolls-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    //Error check
    if (errorCheck('california-rolls-quantity') === false) {
      $('.california-rolls-price').prepend(errorMessage);
      return false;
    }

    const quantity = Number($(".california-rolls-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".california-rolls-quantity").val("");
     //Add item and quantity to local storage
    localStorage.setItem("5", quantity);
    $('.california-rolls-price').prepend(successMessage);
  });



  $(".chicken-teriyaki-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();
    
    //Error check
    if (errorCheck('chicken-teriyaki-quantity') === false) {
      $('.chicken-teriyaki-price').prepend(errorMessage);
      return false;
    }
    const quantity = Number($(".chicken-teriyaki-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".chicken-teriyaki-quantity").val("");
    localStorage.setItem("6", quantity);
    $('.chicken-teriyaki-price').prepend(successMessage);
  });
  
  
  
  $(".shrimp-tempura-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    if (errorCheck('shrimp-tempura-quantity') === false) {
      $('.shrimp-tempura-price').prepend(errorMessage);
      return false;
    }

    const quantity = Number($(".shrimp-tempura-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".shrimp-tempura-quantity").val("");
    localStorage.setItem("7", quantity);
    $('.shrimp-tempura-price').prepend(successMessage);
  });



  $(".cucumber-rolls-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    if (errorCheck('cucumber-rolls-quantity') === false) {
      $('.cucumber-roll-price').prepend(errorMessage);
      return false;
    } 
    const quantity = Number($(".cucumber-rolls-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".cucumber-rolls-quantity").val("");
    localStorage.setItem("8", quantity);
    $('.cucumber-roll-price').prepend(successMessage);
  });




  $(".ice-cream-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    const quantity = Number($(".ice-cream-quantity").val());

    if (errorCheck('ice-cream-quantity') === false) {
      $('.ice-cream-price').prepend(errorMessage);
      return false;
    } 
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".ice-cream-quantity").val("");
    localStorage.setItem("9", quantity);
    $('.ice-cream-price').prepend(successMessage);
  });



  $(".dorayaki-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();
    
    const quantity = Number($(".dorayaki-quantity").val());
    if (errorCheck('dorayaki-quantity') === false) {
      $('.dorayaki-price').prepend(errorMessage);
      return false;
    } 
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".dorayaki-quantity").val("");
    localStorage.setItem("10", quantity);
    $('.dorayaki-price').prepend(successMessage);
  });
  
  
  
  
  $(".japenese-cheesecake-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();

    if (errorCheck('japenese-cheesecake-quantity') === false) {
      $('.japenese-cheesecake-price').prepend(errorMessage);
      return false;
    } 
    const quantity = Number($(".japenese-cheesecake-quantity").val());

    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".japenese-cheesecake-quantity").val("");
    localStorage.setItem("11", quantity);
    $('.japenese-cheesecake-price').prepend(successMessage);
  });
  
  
  
  
  $(".souffle-pancakes-add-to-cart").on("click", function () {
    $('.error-message').remove();
    $('.success-message').remove();
    if (errorCheck('souffle-pancakes-quantity') === false) {
      $('.souffle-pancakes-price').prepend(errorMessage);
      return false;
    } 
    const quantity = Number($(".souffle-pancakes-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".souffle-pancakes-quantity").val("");
    localStorage.setItem("12", quantity);
    $('.souffle-pancakes-price').prepend(successMessage);
  });
});
