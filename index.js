
//api pre top 20 popularnych filmov teraz
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

//cesta k obrazkom filmov
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//hladanie api
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

//spustenie aplikacie - 20 filmov podla popularity
getMovie(APIURL);

//top 20 filmov vykreslenych
async function getMovie(url){
    const response = await fetch(url);
    const responeData = await response.json();

    //vypisanie dat do consoly
    console.log(responeData);

        //vlozenie vsetkych top 20 filmov do html
    /* 
    //vykreslenie plagatov filmov
    responeData.results.forEach((film) => {
        //vybratie parametrov
        const { poster_path, title, vote_average } = film;

        const filmEle = document.createElement("div");
        filmEle.classList.add("film");
        
        //vlozenie html casti do html suboru
        filmEle.innerHTML = `
        <img 
        src="${IMGPATH+poster_path}"
        alt="${title}"
        />
        <div class = "film-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        `;

        //kedze sa jedna o async kod je nutne dat do html na cast scritp     <script src = "index.js" defer></script> defer - toto umozni aby sa js neotvoril ako prvy ale ako posledny a tym padom dany problem sa odstranu kedze main uz nie je null a appendChild nerobi do nullu... ked to bolo predtym tak sa to vytvaralo do document.body a to nebol problem aj ked kod bol async bez deferu.
        main.appendChild(filmEle);
        //document.body.appendChild(filmEle);

    });

    return responeData;
    */

    //pouzitie funkcie hladajFilm na to aby zobrazila vsetky filmy
    hladajFilm(responeData.results);

};

//funkcia pre hladanie filmu inak funguje aj na hladanie konkretneho filmu
function hladajFilm(filmy){
    //vycistit main
    main.innerHTML = "";

    filmy.forEach((film) => {
        //vybratie parametrov
        const { poster_path, title, vote_average, overview } = film;

        const filmEle = document.createElement("div");
        filmEle.classList.add("film");
        
        //vlozenie html casti do html suboru
        filmEle.innerHTML = `
        <img 
        src="${IMGPATH+poster_path}"
        alt="${title}"
        />
        <div class = "film-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        <div class = "overview">
            ${overview}
        </div>
        `;

        //vlozenie vysledku do html
        main.appendChild(filmEle);
    });
}

//hladanie filmu po zadani info do search baru
form.addEventListener("submit", (e) => {
    e.preventDefault();

    //urcenie hladaneho filmu
    const searchNazov = search.value;

    //podmienka pre hladanie filmu
    if(searchNazov){

        getMovie(SEARCHAPI+searchNazov)

        //vypraznenie hladania
        search.value = "";


    }
});