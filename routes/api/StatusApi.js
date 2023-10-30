const express = require('express');
const router = express.Router();
const StatusController = require('../../components/Status/StatusController');


// http://localhost:3000/api/status/get-all
// api get all incident
router.get('/get-all', async (req, res, next) => {
    try {
        const status = await StatusController.getAllStatus();
        return res.status(200).json({ result: true, status: status });
    } catch (error) {
        console.log("Get all error: ", error);
        return res.status(500).json({ result: false, status: null });
    }
});
// http://localhost:3000/api/status/get-by-id?id=
// api get incident by id
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const status = await StatusController.getStatusById(id);
        return res.status(200).json({ result: true, status: status });
    } catch (error) {
        console.log("Get by id error: ", error);
        return res.status(500).json({ result: false, status: null });
    }
});


module.exports = router;