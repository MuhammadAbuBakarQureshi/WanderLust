let searchButton = document.querySelector(".nav-search-button");

searchButton.addEventListener("click", () => {

    let mobileSearchbar = document.querySelector(".mobile-search");

    if(mobileSearchbar.style.display != "inline"){

        mobileSearchbar.style.display = "inline";
    }else{

        mobileSearchbar.style.display = "none";
    }

})