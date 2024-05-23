document.getElementById("btn").addEventListener('click',() => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username=='' || password == '') {
        alert("empty field");
    }
});



