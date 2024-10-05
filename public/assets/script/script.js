import { cardVideos } from './card-videos.js'
import { cardComments } from './card-comments.js'
import { setStoreInicialize, getStore, createStore } from './store.js'
import { postComment, listComments } from './list-videos.js'
import { requests } from './fetch.js'

await setStoreInicialize()

const divCardVideos = document.getElementById('card-videos')
const divCardComments = document.getElementById('comments')
const iframeVideo = document.getElementById('iframe-videos')
const inputSearch = document.querySelector('.input-search')
const btnSendComment = document.getElementById('send-comment')
const textArea = document.getElementById('text-area-comment')
const avatar = document.getElementById("thumbnail-profile-avatar")

const base64Avatar = getStore("user")["avatar"]
if(base64Avatar.length > 0) {
    avatar.src = base64Avatar
}

iframeVideo.src = getStore('videos')[0].url
btnSendComment.setAttribute('id-video', getStore('videos')[0].id)

const releaseDOM = string => {
    const parser = new DOMParser()
    return parser.parseFromString(string, 'text/html').body.firstChild
}

const alternateVideo = async target => {
    
    const actives = Array.from(document.querySelectorAll('.active-show'))
    actives.forEach(a => a.classList.remove('active-show'))
    
    target.classList.add('active-show')
    
    divCardComments.innerHTML = ''
    iframeVideo.src = target.getAttribute('url')
    const id = target.getAttribute('id')

    const commentsFiltered = await listComments({
        "id-video": id
    })

    if(commentsFiltered.data.length > 0) {
        divCardComments.appendChild(releaseDOM(cardComments(commentsFiltered.data)))
    }
    

    btnSendComment.setAttribute('id-video', id)
}

const like = async target => {
    target.classList.replace('far', 'fas')

    const likes = target.nextSibling.nextSibling
    const quantity = parseInt(likes.textContent)

    const config = {
        true: {
            action: 'remove',
            content: quantity - 1,
            replace: {
                before: 'fas',
                after: 'far'
            }
        },
        false: {
            action: 'add',
            content: quantity + 1,
            replace: {
                before: 'far',
                after: 'fas'
            }
        }
    }

    const validation = target.classList.contains('liked')

    likes.textContent = config[validation].content
    target.classList[config[validation].action]('liked')
    target.classList.replace(config[validation].replace.before, config[validation].replace.after)

    await requests.post("api/like.php", {
        like: config[validation].content,
        idlike: target.getAttribute("idlike"),
    }, true)



    
}

const cards = cardVideos(getStore('videos'))
const commentsFiltered = await listComments({
    "id-video": getStore('videos')[0].id
})
const comments = cardComments(commentsFiltered.data)
console.log(cards)
divCardVideos.appendChild(releaseDOM(cards))
divCardComments.appendChild(releaseDOM(comments))

document.body.addEventListener('click', async e => {
    const target = e.target

    if(target.classList.contains('div-content-video')) alternateVideo(target)

    if(target.classList.contains('like-comment')) await like(target)
})


inputSearch.addEventListener('keyup', e => {
    const value = e.target.value.toUpperCase()
    
    const allCardsVideos = Array.from(document.querySelectorAll('.div-content-video'))

    allCardsVideos.forEach(card => {
        card.classList.remove('d-none')
        if(!card.getAttribute('name').toUpperCase().includes(value)){
            card.classList.add('d-none')
        }
    })
   
})

btnSendComment.addEventListener('click', async e => {
    const target = e.target

    const data = [
        {
            "id-video": parseInt(target.getAttribute('id-video')) ,
            "userid": getStore("user")["id"],
            "comment": textArea.value,
            "name": getStore("user")["name"],
            "avatar": getStore("user")["avatar"],
            "likes": 0,
            "datetime": "now",
        }
    ]

    const response = await postComment(data[0])
    
    if(response.data.success){

        const comments = getStore('comments')
        comments.push(data[0])
        createStore('comments', comments)

        divCardComments.appendChild(releaseDOM(cardComments(data)))
        textArea.value = ''
        divCardComments.scrollTo(0, divCardComments.scrollHeight);
    }
   
})