import axios from "axios";
//import db from "../models"
export default {

    getBeers: function(q) {
        const queryURL = `https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${q}`;
        return axios.get(queryURL)
    },

    saveBeer: function(beer) {
        return axios.post("/api/favorites", beer);
    }
}