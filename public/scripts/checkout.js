$(document).ready(function () {
  // const itemDatabase = {
  //   1: {
  //     item_name: 1,
  //     item_name: 'Miso Soup', 
  //     item_description: null,
  //     item_price: 5.00, 
  //     item_img: '/img/miso-soup.jpg'
  //   },
  //   onigiri: {
  //     item_id: 2,
  //     item_name: 'Onigiri (Japenese Riceballs)', 
  //     item_description: null,
  //     item_price: 7.00, 
  //     item_img: '/img/onigiri.jpg'
  //   },
  //   tofu: {
  //     item_id: 3,
  //     item_name: 'Japenese Chilled Tofu',
  //     item_description: null,
  //     item_price: 8.00,
  //     item_img: '/img/chilled_tofu.jpg'
  //   },
  //   adamame: {
  //     item_id: 4,
  //     item_name: 'Salted Adamame',
  //     item_description: null,
  //     item_price: 5.00,
  //     item_img: '/img/edamame.jpg'
  //   },
  //   californiaRolls: {
  //     item_id: 5,
  //     item_name: 'California Rolls',
  //     item_description: null,
  //     item_price: 15.00,
  //     item_img: '/img/california_rolls.jpg'
  //   },
  //   chickenTeriyaki: {
  //     item_id: 6,
  //     item_name: 'Chicken Teriyaki',
  //     item_description: null,
  //     item_price: 20.00,
  //     item_img: '/img/chicken_teriyaki.jpg'
  //   },
  //   shrimpTempura: {
  //     item_id: 7,
  //     item_name: 'Shrimp Tempura',
  //     item_description: null,
  //     item_price: 16.00,
  //     item_img: '/img/shrimp_tempura.jpg'
  //   },
  //   cucumberRolls: {
  //     item_id: 8,
  //     item_name: 'Cucumber Rolls',
  //     item_description: null,
  //     item_price: 15.00,
  //     item_img: '/img/cucumber_roll.jpg'
  //   }, 
  //   iceCream: {
  //     item_id: 9,
  //     item_name: 'Ice Cream',
  //     item_description: null,
  //     item_price: 5.00,
  //     item_img: '/img/ice_cream.jpg'
  //   },
  //   dorayaki: {
  //     item_id: 10,
  //     item_name: 'Dorayaki',
  //     item_description: null,
  //     item_price: 8.00,
  //     item_img: '/img/dorayaki.jpg'
  //   },
  //   soufflePancakes: {
  //     item_id: 11,
  //     item_name: 'Souffle Pancakes',
  //     item_description: null,
  //     item_price: 7.00,
  //     item_img: 'souffle_pancakes.jpg'
  //   },
  //   japeneseCheesecake: {
  //     item_id: 12,
  //     item_name: 'Japenese Cheesecake',
  //     item_description: null,
  //     item_price: 11.00,
  //     item_img: '/img/cheesecake.jpg'
  //   }
  // }

  let itemDatabase;
  $.ajax({
    url: "/items",
    datatype: 'json',
  })
  .then((items) => {
    const itemChoices = {...localStorage};
    let total = 0
    const calculateTotal = function() {
    total = 0; 
    for (const itemId of Object.keys(itemChoices)) {
      total += Number(items.find(item => Number(item.id) === Number(itemId)).price) * localStorage[itemId];
     }
    }
    for (const itemId of Object.keys(itemChoices)) {
      $('#my-order-header').append(`   
        <div id="item-in-cart" class="card rounded-3 mb-4 ${items.find(item => Number(item.id) === Number(itemId)).id}">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
           <div class="col-md-2 col-lg-2 col-xl-2">
             <img
               src="${items.find(item => Number(item.id) === Number(itemId)).item_img}"
               class="img-fluid rounded-3"
               alt="Picture of Item"
             />
           </div>
           <div class="col-md-3 col-lg-3 col-xl-3">
             <p>
               <span class="text-muted">${items.find(item => Number(item.id) === Number(itemId)).item_name}</span
             </p>
           </div>
           <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
             <input
               id="${items.find(item => Number(item.id) === Number(itemId)).id}-quantity"
               min="1"
               name="quantity"
               value="${localStorage[items.find(item => Number(item.id) === Number(itemId)).id]}"
               type="number"
               class="form-control form-control-sm w-50 item-quantity"
             />
           </div>
           <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
             <h5 class="mb-0 item-total" id="${items.find(item => Number(item.id) === Number(itemId)).id}">$${(Number(items.find(item => Number(item.id) === Number(itemId)).price) * localStorage.getItem(items.find(item => Number(item.id) === Number(itemId)).id)).toFixed(2)}</h5>
           </div>
           <div class="col-md-1 col-lg-1 col-xl-1">
             <i class="fas fa-trash fa-lg text-danger" id='${items.find(item => Number(item.id) === Number(itemId)).id}'></i>
           </div>
         </div>
       </div>
     </div>` 
    )};
    // total += (items.find(Number(item => Number(item.id) === Number(itemId)).price) * localStorage.getItem(items.find(item => Number(item.id) === Number(itemId)).id));
    calculateTotal()
    $('.total-cost').html(`$${total.toFixed(2)}`);
    $('.fa-trash').on('click', function() {
      const itemId = $(this).attr('id');
      $(`.${itemId}`).remove();
      const newTotal = Number($('.total-cost').html().slice(1)) - items.find(item => Number(item.id) === Number(itemId)).price * localStorage[itemId];
      localStorage.removeItem($(this).attr('id'));
      $('.total-cost').html(`$${newTotal.toFixed(2)}`); 
    });

    $('.item-quantity').on('click', function() {
    const itemId = $(this).attr('id').replace('-quantity', ''); 
    const itemPrice = items.find(item => Number(item.id) === Number(itemId)).price;
    const newQuantity = $(this).val();
    const newTotal = `$${(Number(newQuantity) * Number(itemPrice)).toFixed(2)}`
    $(`#${itemId}`).html(newTotal);
    localStorage.setItem(itemId, newQuantity);
    calculateTotal()
    $('.total-cost').html(`$${total.toFixed(2)}`);
    });

    $('.order-button').on('click', function() {
    const itemIdAndQuantity = {}
    for (const id in {...localStorage}) {
      itemIdAndQuantity[id] = localStorage[id];
    }
      $.post('/checkout', itemIdAndQuantity);
    })



      //     `   
      //       <div id="item-in-cart" class="card rounded-3 mb-4 ${item}">
   



    // const calculateTotal = function() {
    //   const itemChoices = { ...localStorage};
    //   let total = 0;
    //   console.log(itemChoices);
    //   for (const item in itemChoices) {
    //     console.log('item ',item);
    //     console.log(items.find(item => item.id === item));
    //     // total += (itemDatabase[item]['item_price'] * localStorage[item]);
    // }
    // return total.toFixed(2);
  // }

  }) 



  // const calculateTotal = function() {
  //   const itemChoices = { ...localStorage };
  //   let total = 0;
  //   for (const item in itemChoices) {
  //     total += (itemDatabase[item]['item_price'] * localStorage[item]);
  //   }
  //   return total.toFixed(2);
  // }
  //   for (const item in itemChoices) {
  //     $('#my-order-header').append(
  //     `   
  //       <div id="item-in-cart" class="card rounded-3 mb-4 ${item}">
  //         <div class="card-body p-4">
  //         <div
  //          class="row d-flex justify-content-between align-items-center"
  //        >
  //          <div class="col-md-2 col-lg-2 col-xl-2">
  //            <img
  //              src="${itemDatabase[item]['item_img']}"
  //              class="img-fluid rounded-3"
  //              alt="Picture of Item"
  //            />
  //          </div>
  //          <div class="col-md-3 col-lg-3 col-xl-3">
  //            <p>
  //              <span class="text-muted">${itemDatabase[item]['item_name']}</span
  //            </p>
  //          </div>
  //          <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
  //            <input
  //              id="${item}-quantity"
  //              min="1"
  //              name="quantity"
  //              value="${localStorage[item]}"
  //              type="number"
  //              class="form-control form-control-sm w-50 item-quantity"
  //            />
  //          </div>
  //          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
  //            <h5 class="mb-0 item-total" id="${item}">$${(itemDatabase[item]['item_price'].toFixed(2) * localStorage.getItem(item)).toFixed(2)}</h5>
  //          </div>
  //          <div class="col-md-1 col-lg-1 col-xl-1">
  //            <i class="fas fa-trash fa-lg text-danger" id='${item}'></i>
  //          </div>
  //        </div>
  //      </div>
  //    </div>` 
  //   );
  //   total += (itemDatabase[item]['item_price'] * localStorage.getItem(item));
  //   };
  //   $('.total-cost').html(`$${total.toFixed(2)}`);


  // $('.fa-trash').on('click', function() {
  //   const itemName = $(this).attr('id');
  //   $(`.${itemName}`).remove();
  //   const newTotal = Number($('.total-cost').html().slice(1)) - (itemDatabase[itemName]['item_price'] * localStorage[itemName]);
  //   localStorage.removeItem($(this).attr('id'));
  //   $('.total-cost').html(`$${newTotal.toFixed(2)}`); 
  //   localStorage.removeItem(itemName);
  // });


  // $('.item-quantity').on('click', function() {
  //   const itemName = $(this).attr('id').replace('-quantity', ''); 
  //   console.log(itemName)
  //   const itemPrice = itemDatabase[itemName]['item_price'];
  //   const newQuantity = $(this).val();
  //   const newTotal = `$${(Number(newQuantity) * Number(itemPrice)).toFixed(2)}`
  //   $(`#${itemName}`).html(newTotal);
  //   localStorage.setItem(itemName, newQuantity);
  //   const itemTotal = calculateTotal();
  //   console.log(itemTotal);
  //   $('.total-cost').html(`$${itemTotal}`);
  // });

  // $('.order-button').on('click', function() {
  //   const itemIdAndQuantity = {}
  //   for (const item in {...localStorage}) {
  //     itemIdAndQuantity[itemDatabase[item].item_id] = localStorage[item];
  //   }
  //   const total = calculateTotal();
  //   $.post('/checkout', itemIdAndQuantity);
  // })


});
