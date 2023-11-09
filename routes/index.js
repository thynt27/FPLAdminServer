var express = require('express');
var router = express.Router();
const userController = require('../components/user/UserController');
const IncidentController = require('../components/Incident/IncidentController');
const ReportController = require('../components/Report/ReportController');
const upLoadFile = require('../middle/UploadFile');
/* GET home page. */

/* USER */
router.get('/', async (req, res, next) => {
  const users = await userController.getAllUser();
  res.render('index', { users });
});
router.get('/newUser', function (req, res, next) {
  res.render('user/newUser', { title: 'FPLAdmin' });
});

//localhost:3000/login
router.get('/login', function (req, res, next) {
  res.render('user/login', { title: 'FPLAdmin' });
});
router.get('/register', function (req, res, next) {
  res.render('user/register', { title: 'FPLAdmin' });
});


/* INCIDENT */
router.get('/list', async (req, res, next) => {
  try {
    const incidents = await IncidentController.getAllIncident();
    res.render('incidents/list', { incidents });
  } catch (error) {
    next(error);
  }
});

/* REPORT */
router.get('/report', async (req, res, next) => {
  try {
    const reports = await ReportController.getAllReport();    
    reports.reverse();
    console.log(reports);
    res.render('report/reportList', { reports: reports });
  } catch (error) {
    console.log("Get all error: ", error);
    next(error);
  }
  //res.render('report/reportList', { title: 'FPLAdmin' });
});

router.get('/statistic', async (req, res, next) => {
  try {
    const incidentCounts = await ReportController.getReportCountByIncident();
    const statusCounts = await ReportController.getReportCountByStatus();
    const sevenDaysAgo = await ReportController.getReportByDate();
    const reportMonth = await ReportController.getReportByMonth();
    res.render('report/statistic', {incidentCounts: incidentCounts, statusCounts: statusCounts, sevenDaysAgo: sevenDaysAgo, reportMonth: reportMonth});

  } catch (error) {
    console.log("Get count by incident error: ", error);
    next(error);
  }
});

router.get('/newReport', function (req, res, next) {
  res.render('report/newReport', { title: 'FPLAdmin' });
});

module.exports = router;
