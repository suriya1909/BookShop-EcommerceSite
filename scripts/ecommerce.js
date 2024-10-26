$(() => {
    var products = localStorage.getItem("product-list")
      ? JSON.parse(localStorage.getItem("product-list"))
      : [];
      var carts =sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : [];
    // console.log(products)
    products.forEach((p) => {
      $(".products").append(`
       
       <div class="product">
            <img src="Pictures/${p.picture}" />
            <div class="name my-2">${p.name}</div>
            <div class="desc">${p.description}</div>
            <div class="price my-1">Price ${p.price}</div>
            <div style="text-align: right;">
              <button data-pk='${p.id}' data-name='${p.name}' data-price='${p.price}' type='button' class="cart my-2">Add to cart</button>
            </div>
        </div>
        `);
    });

    $('.cart').on('click', function(){
          var pk=$(this).data('pk');
          var pr=$(this).data('price');
          var n=$(this).data('name');
          var x= carts.filter(p=> p.id ==pk);
          if(x && x.length> 0){
            x[0].qty =x[0].qty+1;
          }
          else{
            carts.push({id:pk,name:n, price:pr, qty: 1});
          }
          sessionStorage.setItem('cart', JSON.stringify(carts));
          console.log(carts);
        });
  });
  function getStar(rating){
    let n = Math.floor(rating);
    
    let html ="";
    for(var i=1; i<=5;i++){
       if(i< n){
        html +=`<i class="fa fa-star" aria-hidden="true"></i>`;
        //console.log(html);
      }      
      else if(i== n){
        if(rating-n>0)
        {
          html +=`<i class="fa fa-star" aria-hidden="true"></i>`;
          html +=`<i class="fa fa-star-half-o" aria-hidden="true"></i>`;
          //console.log(html);
        }         
       else
       {
        html +=`<i class="fa fa-star" aria-hidden="true"></i>`;
       // console.log(html);
       } 
      } 
      else
      {
        
        html +=`<i class="fa fa-star-o" aria-hidden="true"></i>`;
        //console.log(html);
      }
    }
    return html;
  }