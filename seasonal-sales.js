//products, the name of the department it's in, and the price
var container = document.getElementById("container");
var select = document.getElementById("select");
select.addEventListener("change",updateDiscount);

var products;
function getProducts () {
  var data = JSON.parse(this.responseText);
  products = data.products;
}

var categories;
function getCategories () {
  var data = JSON.parse(this.responseText);
  categories = data.categories;
  domOutput();
}

function domOutput() {
  categories.forEach(function(object) {
    for (var i = 0; i < products.length; i++) {
      if (object.id === products[i].category_id) {
        container.innerHTML += "<div>" + object.name + " - " + products[i].name + " " + products[i].price + "</div>";
      }
    }
  })
}

function updateDiscount() {
	console.log(select.value);//season_discount; products.price * discount;
}

function executeThisCodeIfXHRFails () {
  console.log("An error occurred while transferring");
}

function executeThisCodeWhenChunksArrive () {
}

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", getProducts);
myRequest.addEventListener("error", executeThisCodeIfXHRFails);
myRequest.addEventListener("progress", executeThisCodeWhenChunksArrive);
myRequest.open("GET", "products.json");
myRequest.send();

var myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener("load", getCategories);
myRequest2.addEventListener("error", executeThisCodeIfXHRFails);
myRequest2.addEventListener("progress", executeThisCodeWhenChunksArrive);
myRequest2.open("GET", "categories.json");
myRequest2.send();