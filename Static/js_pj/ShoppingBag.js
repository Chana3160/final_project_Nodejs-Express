// const { write } = require("../../Log/logger");

var counter = 0;
var sum = 0;
sessionStorage.setItem("cost", "0");
sessionStorage.setItem("price", "0");

function placeOrder() {
    saveOrder();

}

function drawItemInBug(Item) {
   
    counter += Item[1];
    cost1 = JSON.parse(sessionStorage.getItem("price")) + (Item[0].price) * Item[1];
    sessionStorage.setItem("price", JSON.stringify(cost1));
  
    document.getElementById("itemCount").innerHTML = counter ;
    document.getElementById("totalAmount").innerHTML = "$" + cost1;
    
    var url = "../images/";
    var element = document.getElementById("temp-row");
    var cln = element.content.cloneNode(true);
    var img = document.createElement("img");

    img.src = url + Item[0].imageUrl;
    img.style = "width:100%";
    cln.querySelector(".image").appendChild(img);
    cln.querySelector(".price").innerHTML = (Item[0].price) * Item[1];

    cln.querySelector(".expandoHeight").addEventListener("click", () => { deleteProduct(Item) });
    cln.querySelector(".quentityColumn").innerHTML = Item[1] ;
    document.getElementById("items").appendChild(cln);  
}

function deleteProduct(Item)
{
    costt = JSON.parse(sessionStorage.getItem("price")) - JSON.parse(Item[0].price);
    sessionStorage.setItem("price", JSON.stringify(costt));

    count = JSON.parse(sessionStorage.getItem("count")) - 1;
    sessionStorage.setItem("count", JSON.stringify(count));

    productInCurt = JSON.parse(sessionStorage.getItem("productInCurt"));
    var c = [];
    for (var i = 0; i < count + 1; i++) {
        if (productInCurt[i][0]._id == Item[0]._id)
            productInCurt[i][1] = productInCurt[i][1] - 1;
        if (productInCurt[i][1] != 0) {
            var prd = [];
            prd.push(productInCurt[i][0]);
            prd.push(productInCurt[i][1]);
            c.push(prd);
        }
        sessionStorage.setItem("productInCurt", JSON.stringify(c));
        window.location.href = "../html/ShoppingBag.html";
    }
}



function saveOrder()
{
    var arrOrderItem = [];
    productInBugtoOrder = JSON.parse(sessionStorage.getItem("productInCurt"));
    for (let i = 0; i < productInBugtoOrder.length; i++) {
        let orderItem = {
           id :productInBugtoOrder[i][0]._id,
           quentity : productInBugtoOrder[i][1]
        }
        arrOrderItem.push(orderItem);
    }
    let userIdd = JSON.parse(sessionStorage.getItem("user"));
    let order = {
        date: new Date(),
        amount: sessionStorage.getItem("price"),
        
        userId: userIdd._id,
        products: arrOrderItem

    }

    fetch('/api/Order', {
        headers: {
            'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(order)
    })
        .then(response => {
            if (response.ok && response.status==200)
            return response.json();
        else
            response.json().then(error => {
                alert(JSON.stringify(error.errors));
            });
        })
    
        .then(data => {
            console.log(data, "data");
            alert('ההזמנה מספר' + data._id + 'בוצעה בהצלחה');

            window.location.href = "../html/products.html";
        })
    sessionStorage.setItem("productInCurt", null);
    sessionStorage.setItem("cost", 0);
    sessionStorage.setItem("count", 0);
    sessionStorage.setItem("price", "0");
}
