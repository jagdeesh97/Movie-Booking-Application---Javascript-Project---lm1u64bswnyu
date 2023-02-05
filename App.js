const _url_users = "https://api.themoviedb.org/3/genre/movie/list?api_key=cb01e1433454fe031c347dd4e086f7fe&language=en-US";
const _url_movie = "https://api.themoviedb.org/3/movie/now_playing?api_key=cb01e1433454fe031c347dd4e086f7fe&language=en-US&page=1";


fetch(_url_users)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        display(data);
    })
    .catch((error) => {
        console.log("Error in API call", error);
    });

fetch(_url_movie)
    .then((resp) => {
        return resp.json();
    })
    .then((dataItem) => {
        //console.log(dataItem.results);
        displayCard(dataItem);
    })
    .catch((err) => {
        console.log("Error in API call", err);
    });

display = (data) => {
    let tab = `<h3>Genres</h3>`;
    let arr = [];
    for (let r in data) {
        arr.push(data[r]);

    }
    for (let x of arr[0]) {
        tab += `<p>${x.name}</p>`;
    }
    document.getElementById("genre").innerHTML = tab;
}

displayCard = (dataItem) => {
    let tab1 = "";
    for (let y of dataItem.results) {

        let priceR = Math.floor((Math.random() * 50) + 250);
        let minuteR = Math.floor((Math.random() * 15) + 120);
        tab1 += `
            <div class="col">
                <a data-bs-toggle="modal" data-bs-target="#card${y.id}">
                    <div class="card h-100">
                        <img
                            src="https://image.tmdb.org/t/p/original/${y.poster_path}"
                            class="card-img-top" alt="poster-image" />
                        <div class="card-body">
                            <h5 class="card-title">${y.original_title}</h5>

                            <div class="rating">
                                <p class="capital-text">${y.original_language}</p>
                                <p class="ms-auto">${y.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </a>


                <div class="modal fade" id="card${y.id}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <button type="button" class="btn-close ms-auto pt-2 pe-2" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <img
                                        src="https://image.tmdb.org/t/p/original/${y.poster_path}"
                                        class="img-fluid" alt="poster-popup" />
                                </div>
                                <div class="col">
                                    <div>
                                        <h1>${y.original_title}</h1>
                                        <h3>⭐${y.vote_average}/10</h3>
                                        <p class="capital-text">${y.original_language}</p>
                                        <p>${minuteR} minutes <span style="font-weight: bold">•</span> Action</p>
                                        <p>${y.overview}</p>
                                        <p>₹ ${priceR}</p>
                                        <a class="btn btn-success" href="checkout.html" onclick="bookNow(${y.id})">Book Tickets</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           ` ;
    }
    document.getElementById("poster").innerHTML = tab1;
}
