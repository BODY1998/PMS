let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let btnDeleteAll = document.getElementById("deleteAll");
let createbtn = "create";
let productIndex;
let searchMood = "title";

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "red";
  } else {
    total.innerHTML = "";
    total.style.background = "rgba(67, 3, 187, 0.946)";
  }
}

// clear inputs
function claerData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${products[i].title}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].category}</td>
    <td>update</td>
    <td>delete</td>
    <td><button onclick="updateProduct(${i})" id="update">update</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (products.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteAll()"> Delete All (${products.length})</button>
    `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

// delete all products
function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

// delete product
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

// search for a product
function getSearchMood(id) {
  let searchField = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchField.placeholder = "Search by " + searchMood;
  searchField.focus();
  searchField.value = "";
  showData();
}
function searchProduct(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>update</td>
        <td>delete</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `;
      } else {
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>update</td>
        <td>delete</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `;
      } else {
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// update product
function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  category.value = products[index].category;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  createbtn = "update";
  productIndex = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// create product
let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "") {
    if (createbtn === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[productIndex] = newPro;
      createbtn = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
  }

  // save localstorage
  localStorage.setItem("product", JSON.stringify(products));
  claerData();
  showData();
};

showData();
