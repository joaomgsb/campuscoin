import { getStore, createStore } from "./store.js";
import { postVideo } from "./list-videos.js";

const form = document.getElementById('form-new-video')
const url = document.getElementById('url-video')
const name = document.getElementById('name-video')
const iframe = document.getElementById('iframe-new-videos')

const isYouTubeEmbedLink = link => {
    const regex = /^(https?:\/\/)?(www\.)?youtube\.com/
    return regex.test(link);
}

const replaceForEmbed = link => {
    const embedRegex = /^https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/;
    if (embedRegex.test(link)) {
        return link;
    } else {
        console.log(link);
        const videoId = link.match(/[?&]v=([A-Za-z0-9_-]+)/);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId[1]}`;
        } else {
            return link;
        }
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    

    url.classList.remove('border-danger', 'url-not-valid')

    if (!isYouTubeEmbedLink(url.value)) {
        url.classList.add('border-danger', 'url-not-valid')
        return
    }

    const urlEmbed = replaceForEmbed(url.value)

    const postNewVideo = {
        icon: 'fa-youtube',
        url: urlEmbed,
        name: name.value
    }

    const response = await postVideo(postNewVideo)

    if(response.data.success) window.location = './index.html'

})

url.addEventListener('blur', e => {
    if(isYouTubeEmbedLink(e.target.value)){
        const link = replaceForEmbed(e.target.value)
        iframe.src = link
    }
})