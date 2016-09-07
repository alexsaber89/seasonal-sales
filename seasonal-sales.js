//DOM
var container = document.getElementById("container");
var select = document.getElementById("select");
select.addEventListener("change",discountPercentage);

//Global storage for XHR responses
var products;
function getProducts () {
  var data = JSON.parse(this.responseText);
  products = data.products;
}

var categories;
function getCategories () {
  var data = JSON.parse(this.responseText);
  categories = data.categories;
}

//Determine what discount to apply, based on user selection
function discountPercentage() {
  var selection = select.value;
  var discount = 0;
  for (var j = 0; j < categories.length; j++) {
    if (selection === categories[j].season_discount) {
      discount = categories[j].discount;
    }
  }
  domOutput(discount);
}

//Display product department, name, and price (with discount applied)
function domOutput(discount) {
  var domString = "";
  categories.forEach(function(object) {
    for (var i = 0; i < products.length; i++) {
      if (object.id === products[i].category_id) {
        var discountedPrice = (products[i].price - (products[i].price * discount));
        discountedPrice = Math.round(discountedPrice * 100) / 100;
        domString += "<div>" + object.name + " - " + products[i].name + " $";
        domString += discountedPrice;
        domString += "</div>";
      }
    }
  })
  container.innerHTML = domString;
}

//XHR's
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