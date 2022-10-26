let page = 1;
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

btnNext.addEventListener('click', () => {
	if(page < 1000){
		page += 1;
		uploadMovies();
	}
});

btnPrevious.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		uploadMovies();
	}
});

const uploadMovies = async() => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);
	
		console.log(response);

		// If the answer is correct
		if(response.status === 200){
			const datos = await response.json();
			
			let movies = '';
			datos.results.forEach(movie => {
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = movies;

		} else if(response.status === 401){
			console.log('You put the key wrong');
		} else if(response.status === 404){
			console.log('The movie you are looking for does not exist');
		} else {
			console.log("There was an error and we don't know what happened");
		}

	} catch(error){
		console.log(error);
	}

}

uploadMovies();