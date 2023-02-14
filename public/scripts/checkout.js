$(document).ready(function () {
  const itemDatabase = {
    misoSoup: ['Miso Soup', 5.00, '/img/miso-soup.jpg'],
    onigiri: ['Onigiri (Japenese Riceballs)', 7.00, '/img/onigiri.jpg'],
    tofu: ['Japenese Chilled Tofu', 8.00, '/img/chilled_tofu.jpg'],
    adamame: ['Salted Adamame', 5.00, '/img/edamame.jpg'],
    californiaRolls: ['California Rolls', 15.00, '/img/california_rolls.jpg'],
    chickenTeriyaki: ['Chicken Teriyaki', 20.00, '/img/chicken_teriyaki.jpg'],
    shrimpTempura: ['Shrimp Tempura', 16.00, '/img/shrimp_tempura.jpg'],
    cucumberRolls: ['Cucumber Roll', 15.00, '/img/cucumber_roll.jpg'],
    iceCream: ['Ice Cream', 5.00, '/img/ice_cream.jpg'],
    dorayaki: ['Dorayaki', 8.00, '/img/dorayaki.jpg'],
    soufflePancakes: ['Souffle Pancakes', 7.00, '/img/souffle_pancakes.jpg'],
    japeneseCheesecake: ['Japenese Cheesecake', 11.00, '/img/cheesejake.jpg'],
  }
  const itemChoices = { ...localStorage };
  let total = 0;
  for (const item in itemChoices) {
    $('#my-order-header').append(
    `   
      <div id="item-in-cart" class="card rounded-3 mb-4 ${item}">
        <div class="card-body p-4">
        <div
         class="row d-flex justify-content-between align-items-center"
       >
         <div class="col-md-2 col-lg-2 col-xl-2">
           <img
             src="${itemDatabase[item][2]}"
             class="img-fluid rounded-3"
             alt="Picture of Item"
           />
         </div>
         <div class="col-md-3 col-lg-3 col-xl-3">
           <p>
             <span class="text-muted">${itemDatabase[item][0]}</span
           </p>
         </div>
         <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
           <input
             id="form1"
             min="0"
             name="quantity"
             value="${localStorage[item]}"
             type="number"
             class="form-control form-control-sm w-50"
           />
         </div>
         <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
           <h5 class="mb-0">$${itemDatabase[item][1].toFixed(2)}</h5>
         </div>
         <div class="col-md-1 col-lg-1 col-xl-1">
           <i class="fas fa-trash fa-lg text-danger" id='${item}'></i>
         </div>
       </div>
     </div>
   </div>` 
  );
  total += itemDatabase[item][1];
  };
  $('.total-cost').html(`$${total.toFixed(2)}`);
  $('.fa-trash').on('click', function() {
    const itemName = $(this).attr('id');
    $(`.${itemName}`).remove();
    const newTotal = Number($('.total-cost').html().slice(1)) - itemDatabase[itemName][1];
    $('.total-cost').html(`$${newTotal.toFixed(2)}`); 
  })

});
