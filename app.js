//listen for the click event from submit icon
let add = document.querySelector("#submit");
add.addEventListener("click", function() {
  if (this.innerText == "Update") {
    this.innerText = "Add";
    this.style.background = "rgb(248, 246, 246)";
  }
  saveItems();
});

// this function display item details from the array saved in local storage

const displayItems = () => {
  let container = document.querySelector("#grid");

  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));

  container.innerHTML = "";

  itemInfos.forEach(function(el) {
    const item = document.createElement("div");
    const quantity = document.createElement("div");
    const price = document.createElement("div");
    const id = document.createElement("div");
    const date = document.createElement("div");

    item.textContent = el.item;
    quantity.textContent = el.quantity;
    price.textContent = el.price;
    id.textContent = el.id;
    date.textContent = el.today;

    if (el.completed === true) {
      item.className = "done";
    } else {
      item.classList.remove("done");
    }

    item.addEventListener("click", taskCompleted);

    let buttons = document.createElement("div"),
      edit = document.createElement("button"),
      del = document.createElement("button");
    del.id = el.id;
    edit.id = el.id2;
    edit.innerText = "edit";
    del.innerText = "delete";
    edit.addEventListener("click", editItem);
    del.addEventListener("click", deleteItem);

    buttons.appendChild(del);
    buttons.appendChild(edit);
    container.appendChild(item);
    container.appendChild(quantity);
    container.appendChild(price);
    container.appendChild(id);
    container.appendChild(date);
    container.appendChild(buttons);
  });
};

// this function delete items from the list
const deleteItem = function(e) {
  //Get  from localStorage
  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
  // // Loop through the bookmarks
  for (let i = 0; i < itemInfos.length; i++) {
    if (itemInfos[i].id == this.id) {
      //     // Remove from array
      itemInfos.splice(i, 1);
    }
  }
  // // Re-set back to localStorage
  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));

  // // Re-fetch item
  displayItems();
};

// this function save input value to the local storage

const saveItems = function(e) {
  let item = document.querySelector("#input1").value;
  let quantity = document.querySelector("#input2").value;
  let price = document.querySelector("#input3").value;
  let date = new Date();
  let completed = false;
  let today = date.toDateString();
  let id = Math.random()
    .toString(36)
    .substring(5);
  let id2 = generateID();

  function generateID() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  if (!item || !quantity || !price) {
    alert("Please add your inventories!!");
    return false;
  }

  // create an objects to push inside an array
  let itemInfo = {
    item,
    quantity,
    price,
    completed,
    id,
    id2,
    today
  };

  if (localStorage.getItem("itemInfos") === null) {
    // Init the empty array
    let itemInfos = [];

    // Add to array
    itemInfos.push(itemInfo);
    // Set to localStorage
    localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  } else {
    // Get item from localStorage
    let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
    // Add item to array
    itemInfos.push(itemInfo);
    // Re-set back to localStorage
    localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  }

  document.querySelector("#myForm").reset();

  displayItems();
};
// to edit item from the shopping list
const editItem = e => {
  let item = document.querySelector("#input1");
  let quantity = document.querySelector("#input2");
  let price = document.querySelector("#input3");
  let addButton = document.querySelector("#submit");

  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));

  for (let i = 0; i < itemInfos.length; i++) {
    if (itemInfos[i].id2 == e.target.id) {
      item.value += itemInfos[i].item;
      quantity.value += itemInfos[i].quantity;
      price.value += itemInfos[i].price;
      itemInfos.splice(i, 1);

      addButton.innerText = "Update";
      addButton.style.background = "rgb(18, 203, 196)";
    }
  }
  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
};
// to check the task done
const taskCompleted = e => {
  console.log(e);
  // this.classList.toggle("done");
  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
  let p = e.target.nextSibling.nextSibling.nextSibling;

  itemInfos.forEach((el, i) => {
    if (el.id == p.innerText) {
      el.completed = !el.completed;
    }
  });

  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  displayItems();
};
displayItems();
