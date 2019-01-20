const data = document.getElementById("orderBtn");
const url = "http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods";

setTimeout(() => {
  data.addEventListener("click", () => {
    document.querySelector(".bg-modal").style.display = "flex";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        menu_data = "";

        data.forEach(element => {
          menu_data += `<div class='row json-title'>${element.Naziv}</div>`;

          element.Ponuda.forEach(element => {
            menu_data += `<div class="row json-data" id=${element.JeloId}>`;
            menu_data += `<div class='col span-1-of-3 json-txt'><strong>${
              element.Naziv
            }</strong><br><span>${element.Opis}</span></div>`;
            menu_data += `<div class='col span-1-of-3 json-price'>${parseFloat(
              element.Cijena
            ).toFixed(2)}kn</div>`;
            // menu_data += `<button class="toCart">Add To Cart</button>`;
            menu_data += "</div>";
          });
        });

        document.querySelector(".json-table").innerHTML = menu_data;

        const store = document.getElementsByClassName("json-price");

        const myModalOrder = document.getElementById("modal-order");

        const spanCloseOrder = document.getElementsByClassName(
          "close-modal-order"
        )[0];

        for (let index = 0; index < store.length; index++) {
          const element = store[index];
          element.addEventListener("click", event => {
            const id = event.path[1].id;
            const price = parseFloat(event.path[1].childNodes[1].textContent);
            const title = event.path[1].firstChild.innerText.split(/\r?\n/)[0];
            myModalOrder.style.display = "block";
            document.getElementsByClassName("modal-content-order")[0].id = id;
            document
              .getElementsByClassName("modal-content-order")[0]
              .setAttribute("price", price);

            document.getElementById("mod-title").textContent = title;
            spanCloseOrder.onclick = function() {
              myModalOrder.style.display = "none";
            };
          });
        }

        const orderList = document.getElementById("shopping-cart");
        const checkoutBtn = document.getElementById("mod-button");

        checkoutBtn.addEventListener("click", event => {
          const id = event.path[1].offsetParent.attributes[1].value;
          const price = event.path[1].offsetParent.attributes[2].value;
          const title = event.path[2].childNodes[3].innerText;
          const quantity = parseInt(event.path[1].firstElementChild.value);
          const remark = event.path[1].children[1].firstElementChild.value.trim();
          console.log(price);

          let taskItem = document.createElement("li");
          taskItem.setAttribute("class", "row list-order");
          taskItem.innerHTML = `<div class='col span-1-of-8 list-order-id'>${id}</div><div class='col span-5-of-8'>${title}</div><div class='col span-1-of-8 order-quant'>${quantity}</div><div class='col span-1-of-8'>${price}kn</div>`;
          orderList.appendChild(taskItem);
          if (remark.trim().length > 0) {
            let remarkItem = document.createElement("div");
            remarkItem.setAttribute("class", "remark");
            remarkItem.innerHTML = `${remark}`;
            orderList.appendChild(remarkItem);
          }

          const listItem = document.querySelectorAll(".list-order");
          let totalPrice = 0;

          if (listItem.length > 0) {
            for (let i = 0; i < listItem.length; i++) {
              const element = listItem[i];
              const quantity = parseInt(element.children[2].innerText);
              const price = parseFloat(element.children[3].innerText);
              const total = quantity * price;
              totalPrice += total;
            }
          }

          document.querySelector(
            ".checkout-price"
          ).innerText = `${totalPrice.toFixed(2)}kn`;
        });

        // orderList.addEventListener("click", event => {
        //   if (event.target.tagName == "LI") {
        //     event.target.remove();
        //   }
        // });
      });
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".bg-modal").style.display = "none";
  });

  function putElement(element, className) {
    const para = document.createElement("div");
    const node = document.createTextNode(element);
    para.appendChild(node);

    const el = document.querySelector(className);
    el.appendChild(para);
  }

  function addItem(i) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(i));
    li.className = "item";
    document.getElementById("list").appendChild(li);
  }
}, 2000);
