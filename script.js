// an array with all of our cart items
var cart = [];
var products = [
{name:'glass',price:68,url:'http://ecx.images-amazon.com/images/I/31AOX24ATKL.jpg'},
{name:'pencils',price:3,url:'http://ecx.images-amazon.com/images/I/51YFEe%2BCYbL.jpg'}
];

var updateCart = function () {
  var source1 = $('#cart-item-1').html();
  var template1 = Handlebars.compile(source1);
  var source2 = $('#cart-item-2').html();
  var template2 = Handlebars.compile(source2);
    $('.cart-list').empty();

  for(i = 0; i < cart.length; i++){
  	if(cart[i].amount > 1){
  		var newHtml = template2(cart[i]);
  	}else{
  		var newHtml = template1(cart[i]);
  	}
  	$('.cart-list').append(newHtml);
  }
  var total = getTotal();
  $('.total').text(total);
}

var getTotal = function (){
	var total = 0;

	for(i = 0; i < cart.length; i++){
		var toAdd = cart[i].price * cart[i].amount;
		total += toAdd;
	}
	return total;
}

var addItem = function (item) {
  var l = cart.length;

  for(i = 0; i < l; i++){
  	if(cart[i].name === item.name) {
  		cart[i].amount++
      updateCart();
      return;
  	}
  }

  cart.push(item);
  updateCart();
}

var removeItem = function (index) {
	cart.splice(index,1);
	updateCart();
}

var clearCart = function () {
  cart = [];
  updateCart();
}

var updateProducts = function () {
  var source = $('#item-card').html();
  var template = Handlebars.compile(source);
  $('.row').empty();

  for(i = 0; i < products.length; i++){
    var newHtml = template(products[i]);
    $('.row').append(newHtml);
  }
}

var removeProduct = function (product){
  var index  = product.index();
  products.splice(index,1);
  updateProducts();
}

$('.view-cart').on('click', function () {
  $('.shopping-cart').toggleClass('show');
});

// $('.view-manager').on('click' ,function() {
//   $('.create-item').toggleClass('show');
// });

$('.row').on('click', '.add-to-cart', function () {
  var name = $(this).parent().parent().data().name;
  var price = $($(this).parent()).parent().data().price;
  var item = {name:name,price:price,amount:1};

  addItem(item);
  updateCart();
});

$('.row').on('click', '.deletebox', function () {
  removeProduct($(this).closest('.col-md-4'));
});

$('.clear-cart').on('click', function () {
  clearCart();
});

$('.cart-list').on('click','.item-remove', function() {
	var index = $(this).parent().index();
	removeItem(index);
});



updateCart();
updateProducts();