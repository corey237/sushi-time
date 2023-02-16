$(document).ready(function () {
  $.ajax({
    url: "/items",
    datatype: "json",
  }).then((items) => {
    const itemChoices = { ...localStorage };
    let total = 0;
    const calculateTotal = function () {
      total = 0;
      for (const itemId of Object.keys(itemChoices)) {
        total +=
          Number(
            items.find((item) => Number(item.id) === Number(itemId)).price
          ) * localStorage[itemId];
      }
    };
    for (const itemId of Object.keys(itemChoices)) {
      $("#my-order-header").append(`
        <div id="item-in-cart" class="card rounded-3 mb-4 ${
          items.find((item) => Number(item.id) === Number(itemId)).id
        }">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
           <div class="col-md-2 col-lg-2 col-xl-2">
             <img
               src="${
                 items.find((item) => Number(item.id) === Number(itemId))
                   .item_img
               }"
               class="img-fluid rounded-3"
               alt="Picture of Item"
             />
           </div>
           <div class="col-md-3 col-lg-3 col-xl-3">
             <p>
               <span class="text-muted">${
                 items.find((item) => Number(item.id) === Number(itemId))
                   .item_name
               }</span
             </p>
           </div>
           <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
             <input
               id="${
                 items.find((item) => Number(item.id) === Number(itemId)).id
               }-quantity"
               min="1"
               name="quantity"
               value="${
                 localStorage[
                   items.find((item) => Number(item.id) === Number(itemId)).id
                 ]
               }"
               type="number"
               class="form-control form-control-sm w-50 item-quantity"
             />
           </div>
           <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
             <h5 class="mb-0 item-total" id="${
               items.find((item) => Number(item.id) === Number(itemId)).id
             }">$${(
        Number(items.find((item) => Number(item.id) === Number(itemId)).price) *
        localStorage.getItem(
          items.find((item) => Number(item.id) === Number(itemId)).id
        )
      ).toFixed(2)}</h5>
           </div>
           <div class="col-md-1 col-lg-1 col-xl-1">
             <i class="fas fa-trash fa-lg text-danger" id='${
               items.find((item) => Number(item.id) === Number(itemId)).id
             }'></i>
           </div>
         </div>
       </div>
     </div>`);
    }
    calculateTotal();
    $(".total-cost").html(`$${total.toFixed(2)}`);
    $(".fa-trash").on("click", function () {
      const itemId = $(this).attr("id");
      $(`.${itemId}`).remove();
      const newTotal =
        Number($(".total-cost").html().slice(1)) -
        items.find((item) => Number(item.id) === Number(itemId)).price *
          localStorage[itemId];
      localStorage.removeItem($(this).attr("id"));
      $(".total-cost").html(`$${newTotal.toFixed(2)}`);
    });

    $(".item-quantity").on("click", function () {
      const itemId = $(this).attr("id").replace("-quantity", "");
      const itemPrice = items.find(
        (item) => Number(item.id) === Number(itemId)
      ).price;
      const newQuantity = $(this).val();
      const newTotal = `$${(Number(newQuantity) * Number(itemPrice)).toFixed(
        2
      )}`;
      $(`#${itemId}`).html(newTotal);
      localStorage.setItem(itemId, newQuantity);
      calculateTotal();
      $(".total-cost").html(`$${total.toFixed(2)}`);
    });

    $(".order-button").on("click", function () {
      const itemIdAndQuantity = {};
      for (const id in { ...localStorage }) {
        itemIdAndQuantity[id] = localStorage[id];
      }
      localStorage.clear();
      $.post("/checkout", itemIdAndQuantity);
      window.location.replace("/orders");
    });
  });
});

