var url = "https://api.icndb.com/jokes/random";

var button = document.getElementById("get-joke");
button.addEventListener("click", function() {
  getJoke();
});

var paragraph = document.getElementById("joke");

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("load", function() {
    var response = JSON.parse(xhr.response);
    paragraph.innerHTML = response.value.joke;
  });
  xhr.send();
}

// Displaying joke on page load
document.addEventListener("DOMContentLoaded", getJoke);

/* or the second way: 

window.onload = getJoke();

*/
