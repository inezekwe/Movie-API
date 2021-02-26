
const pgNum = document.getElementById("pgNum");

const pageNav = document.getElementById("pageNav");

const pgDownBtn = document.getElementById("pgDownBtn");

const pgUpBtn = document.getElementById("pgUpBtn");

const pgSkipNum = document.getElementById("pgSkipNum");

const pgSkipBtn = document.getElementById("pgSkipBtn");


pgDownBtn.addEventListener("click", pgDown);
pgUpBtn.addEventListener("click", pgUp);
pgSkipBtn.addEventListener("click", pageSkip);

//Next page in search results
function pgUp() {
    if(search.value) {
        let page = parseInt(pgNum.innerHTML) + 1;

        let result = doPageSearch(page);
        
        if(result) {
            pgNum.innerHTML = page
        }

    }
    else {
        alert("Please type in a search term");
    }

}

//Previous page in search results
function pgDown() {
    if(search.value && parseInt(pgNum.innerHTML) > 1) {
        let page = parseInt(pgNum.innerHTML) - 1;

        let result = doPageSearch(page);
        
        if(result)
            pgNum.innerHTML = page;
    }
    else {
        alert("Please type in a search term");
    }
}

function pageSkip(event) {
    
    event.preventDefault();
    
    let page = pgSkipNum.value;

    if(page) {
        let result = doPageSearch(page);
        if(result)
            pgNum.innerHTML = page;
    }
}