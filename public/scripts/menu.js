$(document).ready(function () {
  let cartCounter = 0;
  $(".miso-soup-add-to-cart").on("click", function () {
    const quantity = Number($(".miso-soup-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    localStorage.setItem("misoSoup", quantity);
    $(".miso-soup-quantity").val("");
  });
  $(".onigiri-add-to-cart").on("click", function () {
    const quantity = Number($(".onigiri-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".onigiri-quantity").val("");
    localStorage.setItem("onigiri", quantity);
  });
  $(".tofu-add-to-cart").on("click", function () {
    const quantity = Number($(".tofu-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".tofu-quantity").val("");
    localStorage.setItem("tofu", quantity);
  });
  $(".adamame-add-to-cart").on("click", function () {
    const quantity = Number($(".adamame-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".adamame-quantity").val("");
    localStorage.setItem("adamame", quantity);
  });
  $(".california-rolls-add-to-cart").on("click", function () {
    const quantity = Number($(".california-rolls-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".california-rolls-quantity").val("");
    localStorage.setItem("californiaRolls", quantity);
  });
  $(".chicken-teriyaki-add-to-cart").on("click", function () {
    const quantity = Number($(".chicken-teriyaki-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".chicken-teriyaki-quantity").val("");
    localStorage.setItem("chickenTeriyaki", quantity);
  });
  $(".shrimp-tempura-add-to-cart").on("click", function () {
    const quantity = Number($(".shrimp-tempura-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".shrimp-tempura-quantity").val("");
    localStorage.setItem("shrimpTempura", quantity);
  });
  $(".cucumber-rolls-add-to-cart").on("click", function () {
    const quantity = Number($(".cucumber-rolls-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".cucumber-rolls-quantity").val("");
    localStorage.setItem("cucumberRolls", quantity);
  });
  $(".ice-cream-add-to-cart").on("click", function () {
    const quantity = Number($(".ice-cream-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".ice-cream-quantity").val("");
    localStorage.setItem("iceCream", quantity);
  });
  $(".dorayaki-add-to-cart").on("click", function () {
    const quantity = Number($(".dorayaki-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".dorayaki-quantity").val("");
    localStorage.setItem("dorayaki", quantity);
  });
  $(".japenese-cheesecake-add-to-cart").on("click", function () {
    const quantity = Number($(".japenese-cheesecake-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".japenese-cheesecake-quantity").val("");
    localStorage.setItem("japeneseCheesecake", quantity);
  });
  $(".souffle-pancakes-add-to-cart").on("click", function () {
    const quantity = Number($(".souffle-pancakes-quantity").val());
    cartCounter += quantity;
    $(".fa-cart-shopping").html(cartCounter);
    $(".souffle-pancakes-quantity").val("");
    localStorage.setItem("soufflePancakes", quantity);
  });
});
