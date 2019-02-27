const link = "https://spreadsheets.google.com/feeds/list/1FRZSnd9BuKCG4fpcLk6EvSrBjSiMbJ7CLBa9txVfBnE/od6/public/values?alt=json";
const section = document.querySelector("section");
const main = document.querySelector("main");
const nav = document.querySelector(".use-nav");
const all = document.querySelector(".use-nav div");
const overlayNav = document.querySelector(".overlay-content");
const template = document.querySelector("template").content;
const flipCard = document.querySelectorAll(".flip-card");

all.addEventListener("click", () => filter("all"));



function creatCategory(uses) {
    uses.forEach(use => {
        if (document.querySelector("#" + use.gsx$use.$t + "b")) {

        } else {
            const newDiv = document.createElement("div");
            const newA = document.createElement("a");
            const a = document.createElement("a");
            newA.textContent = use.gsx$use.$t;
            newA.href = "#" + use.gsx$use.$t;

            a.href = "#" + use.gsx$use.$t;
            a.textContent = use.gsx$use.$t;

            newDiv.id = use.gsx$use.$t + "b";
            newDiv.style.backgroundImage = "url(" + "../img/" + use.gsx$img.$t + ".jpg)";
            newA.addEventListener("click", () =>filter(use.gsx$use.$t));




            a.addEventListener("click", () => {
                closeNav();
                filter(use.gsx$use.$t);
            });

            overlayNav.appendChild(a);
            newDiv.appendChild(newA);
            nav.appendChild(newDiv);
        }
    });
}


function filter(use) {
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == use || use == "all") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });

}




function loadJSON(link) {
    fetch(link).then(e => e.json()).then(data => {
        creatCategory(data.feed.entry)
        data.feed.entry.forEach(displayData)
    });
}

function displayData(data) {
    const clone = template.cloneNode("true");

    clone.querySelector("h2").textContent = data.gsx$model.$t;
    clone.querySelector("h1").textContent = data.gsx$brand.$t;
    clone.querySelector("img").src = "../img/imgSide/" + data.gsx$imgside.$t + ".jpg";
    clone.querySelector("article img").src = "../img/imgTop/" + data.gsx$imgtop.$t + ".jpg";
    clone.querySelector(".year").textContent = data.gsx$year.$t;
    clone.querySelector(".model").textContent = data.gsx$model.$t;
    clone.querySelector("h3").textContent = data.gsx$price.$t + ", -kr";
    clone.querySelector(".flip-card").id = data.gsx$use.$t;


    main.appendChild(clone);
}

loadJSON(link); //we call the function to make it run






//button to get the overlay menu

document.querySelector("#menu").addEventListener("click", openNav); //get the menu button and add event listener

function openNav() {
    document.querySelector(".overlay").style.height = "100vh"; // when click on menu button set the overlay heigh to 100vh
}

document.querySelector(".overlay-menu").addEventListener("click", closeNav);

function closeNav() {
    document.querySelector(".overlay").style.height = 0; // when click on menu button set the overlay heigh to 0
}




// GO TOP script //

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
