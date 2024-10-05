let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");
let profile = document.querySelector("#profile-img");
let username = document.querySelector("#username");


let classList = profileDropdownList.classList;

const toggle = () => classList.toggle("active");

window.addEventListener("click", function (e) {
  if (!btn.contains(e.target)) classList.remove("active");
});

const user = JSON.parse(localStorage.getItem("user"));

if(user === null) window.location.href = "login.html";

username.innerText = user.name;

if(user.avatar){
  profile.setAttribute("src", user.avatar);
}