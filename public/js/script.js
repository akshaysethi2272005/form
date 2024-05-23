document.getElementById("btn").addEventListener('click',() => {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    if (username=='' || password == '') {
        alert("empty field");
        window.location.replace(window.location.href);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});



