var express = require('express');
var router = express.Router();
const IncidentController = require('../../components/Incident/IncidentController');


router.get('/list', async (req, res, next) => {
    try {
        const incidents = await IncidentController.getAllIncident();
        res.render('incidents/list', { incidents });
    } catch (error) {
        next(error);
    }
  });
router.post('/add-incident', async (req, res, next)=>{
    try {
        const {name_incident} = req.body;
        const incident = await IncidentController.addIncident(name_incident);
        if(incident){
            console.log(incident);
            return res.redirect('/list');
        }else{
            return res.redirect('incident/list');
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;