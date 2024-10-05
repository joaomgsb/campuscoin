export function cardComments(data){
    console.log(data);
    var card = `<div class="p-2">`
    data.forEach(data => {
        card += `
        <div class="card border-0 mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-1 col-md-2 col-sm-12">
                        <div class="d-flex flex-lg-row flex-md-column mb-3">
                            <i idlike="${data.id}" role="button" class="like-comment far fa-heart fs-3 text-danger"></i>
                            <span class="mx-2">${data.likes}</span>
                        </div>
                    </div>
                    <div class="col-lg-11 col-md-10 col-sm-12 d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="thumbnail-profile">
                                    <img src="${data.avatar.length > 0 ? data.avatar : 'https://static.thenounproject.com/png/4035889-200.png'}">
                                </div>
                                <span class="fw-bold px-2">${data.name}</span>
                                <span class="text-muted px-2">${data.datetime}</span>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <i class="fas fa-reply mx-2 text-purple-dark"></i>
                                <span class="fw-bold text-purple-dark">Reply</span>
                            </div>
                        </div>
                        <div>
                            <p>
                                ${data.comment}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    card += `</div>`

    return card
}