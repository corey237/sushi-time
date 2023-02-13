$(document).ready(function () {
  let cartCounter = 0;
  $(".miso-soup-add-to-cart").on("click", function () {
    cartCounter += Number($(".miso-soup-quantity").val());
    $(".fa-cart-shopping").html(cartCounter);
    $(".miso-soup-quantity").val("");
    localStorage.setItem("misoSoup", 3);
  });
  $(".onigiri-add-to-cart").on("click", function () {
    cartCounter += Number($(".onigiri-quantity").val());
    $(".fa-cart-shopping").html(cartCounter);
    $(".onigiri-quantity").val("");
  });
  $(".tofu-add-to-cart").on("click", function () {
    cartCounter += Number($(".tofu-quantity").val());
    $(".fa-cart-shopping").html(cartCounter);
    $(".tofu-quantity").val("");
  });
  $(".adamame-add-to-cart").on("click", function () {
    cartCounter += Number($(".adamame-quantity").val());
    $(".fa-cart-shopping").html(cartCounter);
    $(".adamame-quantity").val("");
  });
});
