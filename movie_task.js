let search_bar = document.getElementById('search_bar')
let search_btn = document.getElementById('search_btn')
let movie_container = document.getElementById('movie_container')

let dropdown = document.getElementById('dropdown')

movie_container.style.cssText = "display: flex; flex-wrap: wrap; justify-content: center"

search_btn.addEventListener('click', () => {
    let movie_data = search_bar.value.trim()
    
    movie_container.innerHTML = ""
    dropdown.value = 'all'
    if (movie_data.length !== 0) {
        async function movieData() {
            let fetched_mdata = await fetch(`https://www.omdbapi.com/?apikey=90917788&s=${movie_data}`)
            let data = await fetched_mdata.json()
            
            if (data.Response === "True") {
                let allMovies = data.Search
                // movies.forEach((movie) => {
                //     let movie_card = `
                //         <div id='moviecard'> 
                //             <img src='${movie.Poster}' id="poster">
                //             <h1> Title: ${movie.Title} </h1>
                //             <h3> Genre: ${movie.Type} </h3>
                //         </div>`
                //     movie_container.innerHTML += movie_card

                // })
                displayMovies(allMovies)
                dropdown.addEventListener("change",()=>{
                    let movie_genre = dropdown.value
                    if(movie_genre == "all"){
                        displayMovies(allMovies)
                    }else{
                        let filtered_data = allMovies.filter((movie) => movie_genre===movie.Type)
                        if(filtered_data.length !== 0){
                            displayMovies(filtered_data)
                        }else{
                            movie_container.innerHTML = ""
                            movie_container.innerHTML=`<p>${movie_genre} not found for ${movie_data}`
                        }
                    }
                })
            } else {
                movie_container.style.cssText='flex-wrap:nowrap; text-align:center; '
                let h1 = document.createElement('h1')
                h1.setAttribute("id", "h1_not_found")
                h1.innerText = "Movie Not Found !!!"
                h1.style.cssText='margin-bottom :30px'
                movie_container.append(h1)

                let h41 = document.createElement('h4')
                h41.innerText = "Please check the spelling or try searching for another title."
                movie_container.append(h41)
            }
        }
        movieData()
    } else {
        let h3 = document.createElement('h3')
        h3.innerText = "Please enter a movie name! The input cannot be empty or just spaces."
        movie_container.append(h3)
    }
})

function displayMovies(movies){
    dropdown.style.display = "inline-block"
    movie_container.innerHTML = ""
                movies.forEach((movie) => {
                    let movie_card = `
                        <div id='moviecard'> 
                            <img src='${movie.Poster}' id="poster">
                            <h1> Title: ${movie.Title} </h1>
                            <h3> Genre: ${movie.Type} </h3>
                        </div>`
                    movie_container.innerHTML += movie_card
        })
}