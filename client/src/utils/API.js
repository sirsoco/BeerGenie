import axios from "axios";
//import db from "../models"
export default {

    getBeers: (q) => {
        
        const url = `https://api.untappd.com/v4/search/beer?q=${q}&client_id=C07D8B1B31F42D67ABDAB78E49204B7E69788672&client_secret=2CBAEF54C119820777DADB2E0E6ACE4115E95295&sort=name&offset=1&limit=1`

        return axios.get(url); 
    }
}
    