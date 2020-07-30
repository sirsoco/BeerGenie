$(document).ready(loadPage) 

function loadPage() {

    ()
}










function searchBeer(req, res) {

        req = $('#forum-search').val()
        rank = $('#rank').val()
   
   
        req = { name: req,
         rank: rank
       }
       
       const beerData = `https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${req.name}`;
       
       beerData = axios.get(beerData);
       
   
        class beer {
         constructor(Id, rank, name,
         description, abv, labels)
   
         {
   
         Id = beerData.Id  
         rank = req.rank;
         name = beerData.name;
         description = beerData.description
         abv = beerData.abv
         labels= beerData.labels;
   
           };

           
         } 
         
       }).catch(function (err) {
         console.log(err);
         res.status(401).json(err);
   
       });