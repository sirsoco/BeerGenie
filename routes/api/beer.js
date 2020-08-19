const router = require("express").Router();
const beerController = require("../../controllers/beerController");

//
router.route("/")
    .get(beerController.findAll)
    .post(beerController.create);

router
    .route('/:id')
    .get(beerController.findById)
    
router
    .router('/delete')
    .delete(beerController.remove);

module.exports = router; 

