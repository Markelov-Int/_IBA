function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "dws-wrapper") {
        x.className += " responsive";
    } else {
        x.className = "dws-wrapper";
    }
}