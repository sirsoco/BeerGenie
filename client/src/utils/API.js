import axios from "axios";
//import db from "../models"
export default {

    searchBeer: (q) =>
         axios.get(`https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${q}`).then((resutl) => {
             return results 
         }),

    saveBeer: (beer) =>
         axios.post("/api/favorites", beer)
    }
