export function cardVideos(data){
    var cards = `<div class="p-2">`
    data.forEach(d => {
        cards += `
            <div name="${d.name}" title="${d.name}" id="${d.id}" url="${d.url}" role="button" class="rounded div-content-video d-flex align-items-center shadow py-3 px-5 mb-4">
                <i class="fs-4 fa-brands fa-youtube"></i>
                <span class="fw-bold mx-2 text-muted opacity-50 name-video">${d.name}</span>
            </div>
        `
    });

    cards += `</div>`

    return cards
}