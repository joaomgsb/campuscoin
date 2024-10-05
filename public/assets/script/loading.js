export function loading(state){

    const releaseDOM = string => {
        const parser = new DOMParser()
        return parser.parseFromString(string, 'text/html').body.firstChild
    }

    const loader = `
        <div id="loading" class="loading">
            <div class="loading-text">
                <span class="loading-text-words">L</span>
                <span class="loading-text-words">O</span>
                <span class="loading-text-words">A</span>
                <span class="loading-text-words">D</span>
                <span class="loading-text-words">I</span>
                <span class="loading-text-words">N</span>
                <span class="loading-text-words">G</span>
            </div>
        </div>
    `

    const instance = document.getElementById('loading')

    if(instance) instance.remove()

    if(state === true) document.body.appendChild(releaseDOM(loader))

    return
}