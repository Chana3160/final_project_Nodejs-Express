function login() {
    var name = document.getElementById("email1").value;
    var password = document.getElementById("password1").value;

    //debugger;
    fetch('/api/User/' + name + "/" + password)
        .then(response => {
            if (response.ok && response.status == 200) {
                return response.json()
            }
            else {
                alert("לא נמצא משתמש בשם זה:");
            }
        })
        .then(data => {

            if (data != "") {
                console.log(data, "data");
                alert("welcome back" + " " + data.fullName);
                sessionStorage.setItem("user", JSON.stringify(data))
                window.location.href = "passPage.html";
            }
            else {
                alert("לא נמצא משתמש בשם זה:");
            }
        })
};
function sign() {
    let user = {
        email: document.getElementById("email2").value,
        password: document.getElementById("password").value,
        fullName: document.getElementById("fullName").value,
    };

    fetch('/api/User', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user),
    }).then(response => response.json())
        .then(data => {
            alert('hello to :' + JSON.stringify(data.fullName));

        }).catch(e => alert("נכשל!!!! שים לב שכתובת המייל שהזנת תקינה וייחודית"));
}


function Hello() {
    document.getElementById('hello').innerHTML = JSON.parse(sessionStorage.getItem("user")).fullName;
}

function newUser() {
    document.getElementById("newUser").style.display = "block"
}

function update() {
    document.getElementById("updateUser").style.display = "block";
    let user = JSON.parse(sessionStorage.getItem("user"))
    document.getElementById("email2").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("fullName").value = user.fullName;
    // document.getElementById("phone").value = user.phoneUser;
}

function sign2() {
    let user = {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,
        email: document.getElementById("email2").value,
        password: document.getElementById("password").value,
        fullName: document.getElementById("fullName").value,
        // phoneUser: document.getElementById("phone").value
    };

    let Userid = JSON.parse(sessionStorage.getItem('user')).userId;
    fetch('/api/User/' + Userid, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok && response.status == 200)
            alert("הצלחה")
        window.location.href = "../html/passPage.html";
    })

}
function passTo() {
    window.location.href = "../html/Products.html";

}
function moveToUpdate() {
    window.location.href = "../html/enter.html";

}

