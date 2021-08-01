window.onload = function () {
    AOS.init();
    //social networks data
    callAjax("socialNetworks.json", "GET", function (result) {
        printFooterLinks(result, ".social-links")
    });
    //documentation and sitemap data
    callAjax("credits.json", "GET", function (result) {
        printFooterLinks(result, "#credit")
    });
    // categories data
    callAjax("categories.json", "GET", function (result) {
        printCategories(result)
    });
    //various plants for sale data
    callAjax("plants.json", "GET", function (result) {
        printPlants(result);
    });
    //navigation data between pages
    callAjax("navigation.json", "GET", function (result){
        printNav(result);
    });
    $("#searchPlants").on("keyup",filterByName);
    $("#cenaSort").click(function(e){
        e.preventDefault();
        callAjax("plants.json", "GET", function (result) {
            result.sort(function(a,b){
                a = parseFloat(a.price);
                b = parseFloat(b.price);
                if(a > b){
                    return -1;
                }
                else if(b < a){
                    return 1;
                }
                else {
                    return 0;
                }
            });
            printPlants(result);
        });
    });
}
const BASE_URL = "assets/data/";
function callAjax(url, method, result) {
    $.ajax({
        url: BASE_URL + url,
        method: method,
        dataType: "JSON",
        success: result,
        error: function (xhr, status, error) {
            var poruka = "There's been a mistake.";
            switch (xhr.status) {
                case 404:
                    poruka = "Page not found.";
                    break;
                case 500:
                    poruka = "Error.";
                    break;
            }
            $("#feedback").html(poruka);
        }
    });
}
function printNav(navLinks) {
    let html = "<ul class='navbar-nav ml-auto'>";
    let location = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
    for (const link of navLinks) {
        if (location == link.href || location == "") {
            html += `<li class="nav-item active">
                        <a class="nav-link" href="${link.href}">${link.navText}
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>`;
        }
        else {
            html += `<li class="nav-item">
                        <a class="nav-link" href="${link.href}">${link.navText}</a>
                    </li>`;
        }

    }
    html += "</ul>";
    $("#navbarResponsive").html(html);
}
function printFooterLinks(data, target) {
    let html = "";
    for (let item of data) {
        html += `<a href="${item.href}" class="${item.class}">${item.icon}</a>`;
    }
    $(target).html(html);
}
function printCategories(data) {
    let html = `<a href="#" class="list-group-item" data-catid="0">All plants</a>`;
    for (let cat of data) {
        html += `<a href="#" class="list-group-item" data-catid="${cat.id}">${cat.name}</a>`;
    }
    $("#categories").html(html);
    $("#categories a").click(filterByCategory);
}
function printPlants(data) {
    let html = "";
    for (let plant of data) {
        html += `
            <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in-right" data-aos-duration="2000">
                <div class="card h-100">
                    <a href ="#"><img class="card-img-top" src ="assets/img/plants/${plant.image.src}"alt = "${plant.image.alt}"></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">${plant.name}</a>
                        </h4>
                        <p>Latin name: <em>${plant.latinName}</em></p>
                        <p>Availability: <strong>${availabilityObrada(plant.available)}</strong></p>
                        <p>Category: <span class="catName">${plant.category.name}</em></p>
                        <p class="card-text">${descriptionObrada(plant.description)}</p>
                    </div>
                    <div class="card-footer">
                        <h5 class="font-weight-bold">RSD ${plant.price}</h5>
                        <button id="btnCart" type="button" class="btn btn-outline-success btn-block" ${buttonObrada(plant.available)}>Add to cart</button>
                    </div>
                </div>
            </div>
        `
    }
    $("#plants").html(html);
    plants = data;
}
function descriptionObrada(description) {
    let html="";
    if(description != null){
        html += description;
    }
    return html;
}
function availabilityObrada(availableBool){
    let html = "";
    if(availableBool){
        html += "In stock";
    }
    else{
        html += "<s>Out of stock</s>";
    }
    return html;
}
function buttonObrada(availableBool) {
    let html ="";
    if(!availableBool){
        html += "disabled";
    }
    return html;
}
function filterByCategory(e) {
    e.preventDefault();
    const categoryId = this.dataset.catid;
    callAjax("plants.json", "GET", function(result){
        if(categoryId == "0"){
            printPlants(result);
        }
        else{
            const filteredPlants = result.filter(x => x.category.id == categoryId);
            printPlants(filteredPlants);
        }
    });
}
function filterByName() {
    const textEnteredByUser = this.value;
    callAjax("plants.json", "GET", function (result) {
        const filteredPlants = result.filter(x => {
            if(x.name.toLowerCase().indexOf(textEnteredByUser.toLowerCase()) !== -1){
                return true;
            }
        });
        printPlants(filteredPlants);
    });
}


