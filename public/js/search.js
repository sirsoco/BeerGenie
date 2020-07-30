
var requi

$(document).on("ready", "/api/favorite/search/:id").then( renderFavorites)


function renderFavorites ({beer}) {

    $('#beer-name').text(beer.name)

    

};
