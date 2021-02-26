            
const apiKey = "c7982378";

const movielist = document.getElementById("movielist");

const search = document.getElementById("search");

const searchButton = document.getElementById("searchButton");

search.addEventListener("search", doSearch); 
searchButton.addEventListener("click", doSearch);

//Searches for movie or tv based on value from search input
 function doSearch(event) {

    event.preventDefault();

    var s = search.value;
                    
    $.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${s}`, function(data) {

        if(data.Response == "True") {

            movielist.innerHTML = "";

            for(var i = 0; i < data.Search.length; i++) {
                            
                var movie = createListingItem(data.Search[i]);
                                
                movielist.appendChild(movie);
            }

            pgNum.innerHTML = 1;
            pageNav.style.display = "block";

        }
        else {
            alert("Please type in a search term");
        }
            
    });
}

//Searches for movie or tv based on value from search input and page number
function doPageSearch(p) {

    var s = search.value;
    var response = true;
    
                    
    $.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${p}`, function(data) {

        if(data.Response == "True") {

            movielist.innerHTML = "";

            for(var i = 0; i < data.Search.length; i++) {
                            
                var movie = createListingItem(data.Search[i]);
                                
                movielist.appendChild(movie);
            }

        }
        else {
            alert("Please type in a search term");
            response = false;
        }
         
    });

    return response; 
}



          

          
            


           
            
            
     