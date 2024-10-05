import { requests } from "./fetch.js"

const form = document.getElementById("registerForm")
const email = document.getElementById("email")
const password = document.getElementById("password")
const name = document.getElementById("nome")
const avatar = document.getElementById("avatar")


const startVideo = async () => {

    let isDevice = false

    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log(devices)
    devices.forEach(device => {
        if (device.kind === 'videoinput'){

            navigator.getUserMedia(
                { video: { deviceId: device.deviceId }},
                stream => cam.srcObject = stream,
                error => console.error(error)
            )

            isDevice = true
        }
    })

    return isDevice
}

/*if(await startVideo()) {
    const create={
        id:1
    }
    const facialRecognition = {
        id: create.id,
        images: []
    }

    Swal.fire({
        html: `<video autoplay id="cam" width="400" height="400" muted></video>`,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
            const cam = document.getElementById('cam')

            cam.addEventListener('play', async () => {
                
                let i = 0
                let quantityCaptures = 6
                let timer = 1000
    
                const interval = setInterval(async () => {
    
                    i++
                    if(i === quantityCaptures) {
                        clearInterval(interval)

                        const response = await requests.post('api/capture.php', facialRecognition)
                        
                        if(!response.error){

                            Swal.fire({
                                toast: true,
                                text : response.message,
                                icon: "success",
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                            })

                        }
                        
                    }
    
                    const canvas = document.createElement("canvas")
                    canvas.width = cam.videoWidth
                    canvas.height = cam.videoHeight
    
                    canvas.getContext('2d').drawImage(cam, 0, 0, canvas.width, canvas.height);
                    const imgDataUrl = canvas.toDataURL('image/png')

                    facialRecognition.images.push(imgDataUrl)
                    
                }, timer)
            })
        }
    })
}       
*/
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const verifyUser = await requests.get("api/userExists.php", {
        email: email.value,
    })

    if(verifyUser.data.emailExists){
        alert(verifyUser.message)
        return
    }

    const create = await requests.post("api/userRegister.php", {
        email: email.value,
        password: password.value,
        name: name.value,
        avatar: avatar.files[0]
    }, true)

    const { isConfirmed } = await Swal.fire({
        title: "Reconhecimento facial",
        text: "Deseja fazer um reconhecimento facial ?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não fera vlw"
    })

    if(isConfirmed && create.data.id != undefined){
        if(await startVideo()) {

            const facialRecognition = {
                id: create.data.id,
                images: []
            }

            Swal.fire({
                html: `<video autoplay id="cam" width="400" height="400" muted></video>`,
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: async () => {
                    const cam = document.getElementById('cam')
    
                    cam.addEventListener('play', async () => {
                        
                        let i = 0
                        let quantityCaptures = 6
                        let timer = 1000
            
                        const interval = setInterval(async () => {
            
                            i++
                            if(i === quantityCaptures) {
                                clearInterval(interval)

                                const response = await requests.post('api/capture.php', facialRecognition)
                                
                                if(!response.error){

                                    Swal.fire({
                                        toast: true,
                                        text : response.message,
                                        icon: "success",
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                    })

                                }
                                
                            }
            
                            const canvas = document.createElement("canvas")
                            canvas.width = cam.videoWidth
                            canvas.height = cam.videoHeight
            
                            canvas.getContext('2d').drawImage(cam, 0, 0, canvas.width, canvas.height);
                            const imgDataUrl = canvas.toDataURL('image/png')

                            facialRecognition.images.push(imgDataUrl)
                            
                        }, timer)
                    })
                }
            })
        }
    }

})