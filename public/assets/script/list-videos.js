import routes from './routes.js'
import { fetchHeaders, requests } from './fetch.js'
import { loading } from './loading.js'

export async function listVideos(params = {}){
    loading(true)

    const response = await requests.get("api/getVideos.php", params)
    
    loading(false)
    return response
}

export async function listComments(params = {}){
    loading(true)

    const response = await requests.get("api/getComments.php", params)
    
    loading(false)
    return response
}

export async function postComment(data){
    loading(true)

    const response = await requests.post("api/postComment.php", data, true)

    loading(false)
    return response
}

export async function postVideo(data){
    loading(true)

    const response = await requests.post(routes.videos, data, true)
    
    loading(false)
    return response
}