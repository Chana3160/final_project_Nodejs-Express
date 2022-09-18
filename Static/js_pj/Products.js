

//ציור הנתונים בדף מוצרים הראשי
function drawProduct(product) {   
    var url = "../images/";
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);
    clonProducts.querySelector("img").src = url + product.imageUrl;
    console.log("product.image", url + product.imageUrl);
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "$" + product.price;
    clonProducts.querySelector(".description").innerText = product.desc;
    clonProducts.querySelector("button").addEventListener("click", ()=> {
        addToCart(product)
    });
    
    document.getElementById("PoductList").appendChild(clonProducts);

}


//פונקציית הוספה לסל על מוצר
function addToCart(product) {
    var productInCurt = JSON.parse(sessionStorage.getItem("productInCurt"));
    if (productInCurt == null) {
        productInCurt = [];
    }

    var tmp = 0;
    var prd = [];

    for (var i = 0; i < productInCurt.length; i++) {
        if (product._id == productInCurt[i][0]._id) {
            tmp = 1;
            productInCurt[i][1] = productInCurt[i][1] + 1;
        }
    }
    if (tmp == 0) {
        prd.push(product);
        prd.push(1);
        productInCurt.push(prd);
    }
    alert("המוצר התווסף לסל הקניות שלך😊");
    sessionStorage.setItem("productInCurt", JSON.stringify(productInCurt));


    count = JSON.parse(sessionStorage.getItem("count")) + 1;
    sessionStorage.setItem("count", JSON.stringify(count));
    document.getElementById("ItemsCountText").innerHTML = count;
   
}

function getProduct() {

    fetch("/api/Product")
        .then(Response => {
            if (Response.ok && Response.status == 200) {
                return Response.json()
            }
            else {
                alert("faild");
                return "erro"
            }
        })
        .then((data) => {
            if (data != "erro")
            {
                sessionStorage.setItem("products", JSON.stringify(data))
                data.forEach((data) => {
                    drawProduct(data);
                })
            }
        })
        .catch ();
}

//ציור הנתונים בדף מוצרים הראשי
// בסל פונקציה של הוספה לסל
function shopingBag() {
    let productInBug = JSON.parse(sessionStorage.getItem("productInCurt"));
    productInBug.forEach((data) => {
        drawItemInBug(data);
    });
}



function getCategory() {

    getProduct();
    fetch("/api/Category")
        .then(Response => {
            if (Response.ok && Response.status == 200) {
                return Response.json()
            }
            else {
                alert("faild");
                return "erro"
            }
        })
        .then((data) => {
            if (data != "erro") { 
                data.forEach((d) => {
                 
                        drawCategory(d);
             
                })
                var c = JSON.parse(sessionStorage.getItem("count"));
                if (c == null) { 
                    sessionStorage.setItem("count", 0);
                    sessionStorage.setItem("cost", "0");
                }
                document.getElementById("ItemsCountText").innerHTML = c;
            }
        })
    .catch ();
}

function drawCategory(category) {
    var c = document.getElementById("temp-category");
    var cloncategory = c.content.cloneNode(true);
    cloncategory.querySelector(".OptionName").innerHTML = category.name;
    cloncategory.querySelector("input").addEventListener("change", () => {
        getProductByCategory(category._id)
    });
    document.getElementById("filters").appendChild(cloncategory);
}

function getProductByCategory(_id) {
    fetch("/api/Product/" + _id)
        .then(Response => {
            if (Response.ok && Response.status == 200)
                return Response.json()
            else
                throw new Error(Response.status)
        })
        .then(data => {
            if (data) {
                document.body.removeChild(document.getElementById("PoductList"));
                var d = document.createElement('div');
                d.setAttribute("id", "PoductList");
                document.body.appendChild(d);
                data.forEach(p => {
                    return drawProduct(p)
                });
            }
        })
.catch (err=> console.log(err))
   
}
