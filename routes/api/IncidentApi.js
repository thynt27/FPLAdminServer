const express = require('express');
const router = express.Router();
const IncidentController = require('../../components/Incident/IncidentController');


// http://localhost:3000/api/incident/get-all
// api get all incident
router.get('/get-all', async (req, res, next) => {
    try {
        const incidents = await IncidentController.getAllIncident();
        return res.status(200).json({ result: true, incidents: incidents });
    } catch (error) {
        console.log("Get all error: ", error);
        return res.status(500).json({ result: false, incidents: null });
    }
});
// http://localhost:3000/api/incident/get-by-id?id=
// api get incident by id
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const incident = await IncidentController.getIncidentById(id);
        return res.status(200).json({ result: true, incident: incident });
    } catch (error) {
        console.log("Get by id error: ", error);
        return res.status(500).json({ result: false, incident: null });
    }
});

//api add incident
//http://localhost:3000/api/incident/add-incident
router.post('/add-incident', async (req, res, next)=>{
    try {
        const {name_incident} = req.body;
        const incident = await IncidentController.addIncident(name_incident);
        if(incident){
            return res.status(200).json({ result: true, incident: name_incident});
        }else{
            return res.status(400).json({result: false, incident: null});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({result: false, message: 'Lỗi hệ thống'});
    }
})


module.exports = router;