import { requests } from "./fetch.js"

const facial = document.querySelector("#facial")

const loadLabels = async () => {

        const { labels } = await requests.get("api/getAllLabels.php")

        return Promise.all(labels.map(async label => {
            const descriptions = []

            for (let i = 0; i <= 4; i++) {
                const img = await faceapi.fetchImage(`./assets/lib/face-api/labels/${label}/${i}.png`)
                
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        }))
}

const startVideo = async () => {

    let isDevice = false

    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log(devices)
    devices.forEach(device => {
        
        if (device.kind === 'videoinput'){

            navigator.getUserMedia(
                { video: { deviceId: device.deviceId }},
                stream => cam.srcObject = stream,
                error => {
                    //console.error(error)
                    //Swal.fire("Erro", "Nenhuma câmera detectada", "error")
                }
            )

            isDevice = true
        }
    })

    return isDevice
}

facial.addEventListener("click", async () => {
    Swal.fire({
        html: `<video autoplay id="cam"width="400" height="400" muted></video>`,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
            const cam = document.getElementById('cam')
    
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('./assets/lib/face-api/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('./assets/lib/face-api/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('./assets/lib/face-api/models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/lib/face-api/models'),
            ]).then(startVideo)
    
            cam.addEventListener('play', async () => {
                const canvas = faceapi.createCanvasFromMedia(cam)
    
                const canvasSize = {
                    width: cam.width,
                    height: cam.height
                }
    
                const labels = await loadLabels()
                faceapi.matchDimensions(canvas, canvasSize)
            
                const container = document.querySelector(".swal2-html-container")
                container.appendChild(canvas)
            
                const distanceThreshold = 0.3 // Limitar de distância para autenticação (ajuste conforme necessário)
    
                const attempts = []
            
                const interval = setInterval(async () => {
                    const detections = await faceapi
                        .detectSingleFace(cam, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceDescriptor()
            
                    if (detections) {
                        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
                        const faceMatcher = new faceapi.FaceMatcher(labels, distanceThreshold)
                        const bestMatch = faceMatcher.findBestMatch(detections.descriptor)
            
                        // Aqui você pode decidir como lidar com a autenticação
                        if (bestMatch._distance < distanceThreshold) {
    
                            attempts.push(bestMatch._distance)
    
                            //5 tentativas com sucesso
                            if(attempts.length >= 5){
    
                                clearInterval(interval)
    
                                const { data, message } = await requests.post("api/login.php", {
                                    hash: bestMatch.label
                                }, true)
                        
                                if(data.login){
                                    localStorage.setItem("user", JSON.stringify(data))
                                    alert(`Login bem-sucedido! Bem-vindo, ${data.name}`)
                                    window.location.href = 'index.html'
                                    return
                                }
                                
                                alert(message)
                            }
    
                            
                        } else {
                            console.log('Usuário não reconhecido')
                            // Ações para lidar com usuário não reconhecido
                        }
            
                        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                        faceapi.draw.drawDetections(canvas, resizedDetections)
                        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                    }
                
                }, 1000)
            })
        }
    })
})

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    const { data, message } = await requests.post("api/login.php", {
        email: email,
        password: password
    }, true)

    if(data.login){
        localStorage.setItem("user", JSON.stringify(data))
        alert(`Login bem-sucedido! Bem-vindo, ${data.name}`)
        window.location.href = 'index.html'
        return
    }

    alert(message)
});

localStorage.removeItem("user")