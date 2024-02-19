let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

// building Node class to be used in Linked List
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// building LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    if (this.size === 0) {
      return true;
    }
  }
  getSize() {
    return this.size;
  }
  addFromBeginning(value) {
    // O(1)
    const node = new Node(value);
    // the head should points to the first node
    if (this.isEmpty()) {
      this.head = node;
    } else {
      // adding new node as a first node
      node.next = this.head;
      this.head = node;
    }
    // updating size every time adding new node to the list
    this.size++;
  }
  addFromLast(value) {
    // O(n)
    const node = new Node(value);
    // the head should points to the first node
    if (this.isEmpty()) {
      this.head = node;
    } else {
      // adding new node as a last node
      let last = this.head;
      while (last.next) {
        last = last.next;
      }
      last.next = node;
    }
    // updating size every time adding new node to the list
    this.size++;
  }
  insert(value, index) {
    if (index < 0 || index > this.size) {
      console.log("cannot insert due to list is empty");
      return;
    }
    if (index == 0) {
      this.addFromBeginning(value);
    } else {
      const node = new Node(value);
      let last = this.head;
      for (let i = 0; i < index - 1; i++) {
        last = last.next;
      }
      node.next = last.next;
      last.next = node;
      this.size++;
    }
  }
  printValues() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.head;
      let listValues = "";
      while (curr) {
        listValues += `${curr.value} `;
        curr = curr.next;
      }
      console.log(listValues);
    }
  }
}

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

const list = new LinkedList();


// create a product
let products = [];

create.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  products.push(newPro);
  console.log(products);
};
