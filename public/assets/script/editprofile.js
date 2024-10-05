import { getStore } from "./store.js";

const profile = getStore("user")

const img = document.querySelector(".img-geral")
const fullname = document.querySelector("#fullname")
const email = document.querySelector("#email")

if(profile.avatar.length > 0) {
    img.setAttribute("src", profile.avatar)
}

fullname.value = profile.name
email.value = profile.email