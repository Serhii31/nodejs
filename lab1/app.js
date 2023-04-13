const URL = "https://studio-ghibli-films-api.herokuapp.com/api/"

function fetchMovies(movieName){
    fetch(URL + `${movieName}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(error => console.log(`Something went wrong!\n${error}`));
}

fetchMovies("Castle In The Sky")

function searchMovies(movieName, callback){
    fetch(URL + `${movieName}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => callback(JSON.stringify(json)))
    .catch(error => console.log(`Something went wrong!\n${error}`));
}

searchMovies("Arrietty", function(json){
console.log(json)
})


async function getMovies(movieName){
    try {
    const response = await fetch(URL + `${movieName}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
    const json = await response.json()
    console.log(JSON.stringify(json))
    }
    catch(error) {
        console.log(`Something went wrong!\n${error}`)
    }
}

getMovies("Ponyo")

