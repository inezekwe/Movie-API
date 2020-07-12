
//Create empty variables for document elements before page loads

    var apiKey = null;

    var movielist = null;

    var singlemovie = null;

    var search = null;

//When page loads, assign values to variables and add event listener to search bar
    $( document ).ready(function() {
            
        apiKey = "c7982378";

        movielist = document.getElementById("movielist");

        singlemovie = document.getElementById("singlemovie");

        search = document.getElementById("search");


        search.addEventListener("search", doSearch); 
                
    })

//Creates the indiv movie displayed at top when "More Info" button is clicked
     function createSingleMovie(data) {
                
        var ratings = '';

        /*Ratings for each title are stored in an array
        For loop stores each rating as string literal in ratings variable*/
        for(var i = 0; i < data.Ratings.length; i++) {
                    
            ratings += `<h6>${data.Ratings[i].Source}</h6>
             <p>Rating: ${data.Ratings[i].Value}</p>`;
        }

        /*Single movie is displayed as a horizontal card at the top of page
        Ratings are added to string literal that is returned*/
            var single = `<div class="col-md-4">
                          <img src="${data.Poster}" class="card-img" style="border: solid black 3px;" alt="${data.Title} poster">
                          </div>
                          <div class="col-md-8">
                          <div class="card-body">
                          <h2 class="card-title">${data.Title}</h2>
                          <h4>${data.Released}</h4>
                          <h4>Rated ${data.Rated}</h4>
                          <h4>Directed by ${data.Director}</h4>
                          <h5>Starring ${data.Actors}</h5>
                          <p>${data.Plot}</p>
                          ${ratings}
                          </div></div>`;

        return single;

     }
             
//Creates the listed movie to be put in movielist element
    function createListingItem(data) {

    /*Movies are organized as cards in rows of three
      First div to contain card was created, then 
      separate divs for the card-img at the top and the card-body*/
    var itemElement = document.createElement('div');
     itemElement.className = "col-sm-4";

    var cardElement = document.createElement('div');
    cardElement.className = "card text-center h-100";

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    /*HTML content for the poster image at the top of the card and
    the title and year for the card body*/
    var imgItem = `<img src="${data.Poster}" class="card-img-top" alt="${data.Title} poster">`
                                
                                
    var bodyHTML =  `<h5 class="card-title">${data.Title}</h5>
                    <h6 class="card-subtitle">${data.Year}</h6>`;
                
    /*Anchor element is created to wrap around button
     link takes you to singlemovie element when button is clicked*/
    var top = document.createElement('a');
    top.setAttribute("href", "#singlemovie");

    //Button is given the movie's IMDB number as it's id  
    var button = document.createElement('button');
    button.className = "btn btn-primary moviebtn";
    button.id = data.imdbID;
    button.innerHTML = "More Info"
                                

    button.addEventListener("click", function() {

        var movieid = this.id;

        $.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieid}`, function(data) {


            console.log(data);
            var singleElement = createSingleMovie(data);;
            singlemovie.innerHTML = singleElement;
                                            
        });

    })
                
    //Add button to anchor element
    top.appendChild(button);
                
    /*Insert string literal into card-body
    add anchor to bottom of card body*/
    cardBody.insertAdjacentHTML('beforeend', bodyHTML);
    cardBody.appendChild(top);
               
    /*Image is inserted into card element
    card body is appended to card element*/
    cardElement.insertAdjacentHTML('beforeend', imgItem)
    cardElement.appendChild(cardBody);
               
    //Card element is appended to div
    itemElement.appendChild(cardElement);
                

    return itemElement;

    }

    
//Searches for movie or tv based on value from search input
 function doSearch(event) {

    var s = search.value;
                    
    $.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${s}`, function(data) {

        if(data.Response == "True") {

            movielist.innerHTML = "";

            for(var i = 0; i < data.Search.length; i++) {
                            
                var movie = createListingItem(data.Search[i]);
                                
                movielist.appendChild(movie);
            }  

        }
        else {
            alert("Please type in a search term");
        }
                    
                        
    });

}

          

          
            


           
            
            
     