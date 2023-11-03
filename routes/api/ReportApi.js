const express = require('express');
const router = express.Router();
const ReportController = require('../../components/Report/ReportController');
const UploadFile = require('../../middle/UploadFile');

// http://localhost:3000/api/report/get-all
// api get all report
router.get('/get-all', async (req, res, next) => {
    try {
        const report = await ReportController.getAllReport();
        return res.status(200).json({ result: true, report: report });
    } catch (error) {
        console.log("Get all error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});
// http://localhost:3000/api/report/get-by-id?id=
// api get report by id
router.get('/get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const report = await ReportController.getReportById(id);
        return res.status(200).json({ result: true, report: report });
    } catch (error) {
        console.log("Get by id error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});
// http://localhost:3000/api/report/get-by-iduser?user=
// api get report by iduser
router.get('/get-by-iduser', async (req, res, next) => {
    try {
        const { user } = req.query;
        const report = await ReportController.getReportByIduser(user);
        return res.status(200).json({ result: true, report: report });
    } catch (error) {
        console.log("Get by iduser error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});
// http://localhost:3000/api/report/get-by-idstatus?status=
// api get report by status
router.get('/get-by-idstatus', async (req, res, next) => {
    try {
        const { status } = req.query;
        const report = await ReportController.getReportByIdstatus(status);
        return res.status(200).json({ result: true, report: report });
    } catch (error) {
        console.log("Get by idstatus error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});
// http://localhost:3000/api/report/get-count-by-status
router.get('/get-count-by-status', async (req, res, next) => {
    try {
        const reportCounts = await ReportController.getReportCountByStatus();

        return res.status(200).json({ result: true, reportCounts });
    } catch (error) {
        console.log("Get count by status error: ", error);
        return res.status(500).json({ result: false, reportCounts: null });
    }
});

// http://localhost:3000/api/report/get-count-by-incident
router.get('/get-count-by-incident', async (req, res, next) => {
    try {
        const reportCounts = await ReportController.getReportCountByIncident();
        return res.status(200).json({ result: true, reportCounts });
    } catch (error) {
        console.log("Get count by incident error: ", error);
        return res.status(500).json({ result: false, reportCounts: null });
    }
});


// http://localhost:3000/api/report/delete-by-id/:id
router.delete('/delete-by-id/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const reports = await ReportController.deleteReportById(id);
        return res.status(200).json({ result: true, reports: reports });

    } catch (error) {
        return res.status(500).json({ result: false, reports: null });
    }
});
// http://localhost:3000/api/report/add-new
// api 
router.post('/add-new', [UploadFile.single('image')], async (req, res, next) => {
    try {
        let { file, body } = req;
        if (file) {
            file = `http://192.168.1.72:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { room, image, rating, status_report, description, date, incident, user } = body;
        await ReportController.addNewReport(room, image, rating, status_report, description, date, incident, user);
        return res.status(200).json({ result: true, report: body });
    } catch (error) {
        console.log("Add new Report error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});


// http://localhost:3000/api/report/edit-new/:id
// api 
router.post('/edit-new/:id', [UploadFile.single('image')], async (req, res, next) => {
    try {
        let { file, body } = req;
        let { id } = req.params;
        if (file) {
            file = `http://192.168.1.72:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { room, image, rating, status_report, description, reciver, incident, user } = body;
        const report = await ReportController.updateReporttById(id, room, image, rating, status_report, description, reciver, incident, user);
        return res.status(200).json({ result: true, report: report });
    } catch (error) {
        console.log("Edit new product error: ", error);
        return res.status(500).json({ result: false, report: null });
    }
});
// http://localhost:3000/api/report/upload-image
// upload 1 ảnh
router.post('/upload-image', [UploadFile.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = `http://192.168.1.72:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, link: link });
        }

        return res.status(400).json({ result: true, link: null });
    } catch (error) {
        console.log("Edit new product error: ", error);
        return res.status(500).json({ result: false });
    }
});

// http://localhost:3000/api/report/upload-images
// upload nhiều ảnh
router.post('/upload-images', [UploadFile.array('image', 2)], async (req, res, next) => {
    try {
        const { files } = req;
        if (files && files.length > 0) {
            const links = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                links.push = `http://192.168.1.72:3000/images/${element.filename}`;
            }

            return res.status(200).json({ result: true, links: links });
        }
        return res.status(400).json({ result: true, links: null });
    } catch (error) {
        console.log("Upload image error: ", error);
        return res.status(500).json({ result: false });
    }
});

module.exports = router;