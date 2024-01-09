/*=====================================================================================
MAP & SET
=====================================================================================*/

/*---------------------------------------------------------------
Scénario 1 : Gérer les Films avec Map
----------------------------------------------------------------*/

let films = new Map();
films.set(1, { titre: "Film A", année: 2021, genre: "Action" });
films.set(2, { titre: "Film B", année: 1984, genre: "Aventure" });
films.set(3, { titre: "Film C", année: 2023, genre: "Comédie" });
films.set(4, { titre: "Film D", année: 2019, genre: "Drame" });
films.set(5, { titre: "Film E", année: 2012, genre: "Science-Fiction" });

// Créer une fonction displayMovie
const displayMovie = (id) => {
    if (films.has(id)) {
        console.log(films.get(id));
    }
};

displayMovie(1);


function displayMovieByTitle(title) {
    for (let [id, film] of films) {
        if (film.titre == title) {
            console.log(`Titre : ${film.titre}`);
            console.log(`Année : ${film.année}`);
            console.log(`Genre : ${film.genre}`);
        }
    }
}


/*---------------------------------------------------------------------
Scénario 2 : Gérer les Utilisateurs et leurs Films Visionnés avec Set
-----------------------------------------------------------------------*/
// Créer une Map watchedMovies
let watchedMovies = new Map();
watchedMovies.set('user1', new Set([1, 2]));
watchedMovies.set('user2', new Set([3]));
watchedMovies.set('user3', new Set([1, 2, 3]));
watchedMovies.set('user4', new Set([4, 5]));
watchedMovies.set('user5', new Set([5]));
console.log(watchedMovies);


// Créer une fonction addWatchedMovies

function addWatchedMovies(userId, filmId) {
    // Si la Map contient l'utilisateur
    if (watchedMovies.has(userId)) {
        watchedMovies.set(userId, watchedMovies.get(userId).add(filmId));
    }
};

addWatchedMovies('user1', 3);
console.log(watchedMovies);


// Créer une fonction displayWatchedMovies

function displayWatchedMovies(userId) {

    // Si la Map "watchedMovies" contient l'utilisateur
    if (watchedMovies.has(userId)) {

        // Parcourir la liste des films déja visionnés par l'utilisateur dont l'id est "userId"

        // on place dans la variable filmsList l'ensemble des films déjà viosonnés par l'utilisateur d'id userId
        let filmsList = watchedMovies.get(userId);

        for (const film of filmsList) {
            //console.log(film);
            // film : indice du film
            // films.get(film) : toutes les données du film (objet)
            // films.get(film).titre : la propriété "titre" de l'objet précédent
            console.log(films.get(film).titre);
        }
    }
};

displayWatchedMovies('user2');


function displayAvailableMovies() {
    const moviesContainer = document.getElementById('movies');// récupère l'élément HTML qui a l'id "movies"
    moviesContainer.innerHTML = '';// vide le contenu de l'élément HTML qui a l'id "movies"
  
    const heading = document.createElement('h2');// création d'un titre
    heading.textContent = 'Liste des films disponibles';//  ajout du texte dans le titre
    
    const table = document.createElement('table');// création du tableau
    const thead = document.createElement('thead');// création de l'entête du tableau
    thead.innerHTML = '<tr><th>ID</th><th>Titre</th><th>Année</th><th>Genre</th></tr>';// ajout de l'entête du tableau
    
    const tbody = document.createElement('tbody');// création du corps du tableau
    films.forEach((film, id) => {// parcours de la Map films
      const row = document.createElement('tr');// création d'une ligne du tableau
      row.innerHTML = `<td>${id}</td><td>${film.titre}</td><td>${film.année}</td><td>${film.genre}</td>`;// ajout des données dans la ligne du tableau
      tbody.appendChild(row);// ajout de la ligne dans le corps du tableau
    });
  
    // Ajout de l'entête et du corps du tableau dans le tableau
    table.appendChild(thead);
    table.appendChild(tbody);
    moviesContainer.appendChild(heading);
    moviesContainer.appendChild(table);
  }
  


/*=====================================================================================*/
function displayUsersAndWatchedMovies() {
    const allWatchedMoviesContainer = document.getElementById('allWatchedMovies'); // récupère l'élément HTML qui a l'id "allWatchedMovies"
    allWatchedMoviesContainer.innerHTML = ''; // vide le contenu de l'élément HTML qui a l'id "allWatchedMovies"
  
    const heading = document.createElement('h2');
    heading.textContent = 'Liste des utilisateurs et des films qu\'ils ont visionnés';
    
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Utilisateur</th><th>Films Visionnés</th></tr>'; // innerHTML permet d'ajouter du contenu HTML dans un élément donc mon tableau
    
    const tbody = document.createElement('tbody');// création du corps du tableau
    watchedMovies.forEach((movies, user) => {// parcours de la Map watchedMovies
      const row = document.createElement('tr');// création d'une ligne du tableau
      let moviesTitles = Array.from(movies).map(movieId => films.get(movieId).titre).join(', ');// création d'un tableau contenant les titres des films visionnés par l'utilisateur
      row.innerHTML = `<td>${user}</td><td>${moviesTitles}</td>`;// ajout des données dans la ligne du tableau
      tbody.appendChild(row);// ajout de la ligne dans le corps du tableau
    });
  
    table.appendChild(thead);// ajout de l'entête du tableau
    table.appendChild(tbody);// ajout du corps du tableau
    allWatchedMoviesContainer.appendChild(heading);// ajout du titre
    allWatchedMoviesContainer.appendChild(table);// ajout du tableau
  }
  
  
/*=====================================================================================*/


function displayMoviesAndWhoWatched() {
    const moviesByUsersContainer = document.getElementById('moviesByUsers');// récupère l'élément HTML qui a l'id "moviesByUsers"
    moviesByUsersContainer.innerHTML = '';// vide le contenu de l'élément HTML qui a l'id "moviesByUsers"
  
    const heading = document.createElement('h2');// création d'un titre
    heading.textContent = 'Liste des films et des utilisateurs qui les ont visionnés';// ajout du texte dans le titre
    
    const table = document.createElement('table');// création du tableau
    const thead = document.createElement('thead');// création de l'entête du tableau
    thead.innerHTML = '<tr><th>Film</th><th>Utilisateurs ayant visionné</th></tr>';// ajout de l'entête du tableau
    
    const tbody = document.createElement('tbody');
    films.forEach((film, movieId) => {
      const row = document.createElement('tr');
      const usersWhoWatched = Array.from(watchedMovies) // convertit la Map watchedMovies en tableau
        .filter(([user, movies]) => movies.has(movieId))// filtre le tableau pour ne garder que les films visionnés par l'utilisateur
        .map(([user]) => user)// ne garde que l'utilisateur
        .join(', ');// transforme le tableau en chaîne de caractères
      row.innerHTML = `<td>${film.titre}</td><td>${usersWhoWatched}</td>`;// ajout des données dans la ligne du tableau
      tbody.appendChild(row);// ajout de la ligne dans le corps du tableau
    });
  
    table.appendChild(thead);
    table.appendChild(tbody);
    moviesByUsersContainer.appendChild(heading);
    moviesByUsersContainer.appendChild(table);
  }
  