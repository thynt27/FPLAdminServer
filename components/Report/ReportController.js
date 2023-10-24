const ReportService = require('./ReportService');

const getAllReport = async () => {
    try {
        return await ReportService.getAllReport();
    } catch (error) {
        throw error;
    }
    
}
const getReportById = async(id)=>{
    try {
        return await ReportService.getReportById(id);
    } catch (error) { 
        return null;
    }
}

const deleteReportById = async (id) => {
    try {
        return await ReportService.deleteReportById(id);
    } catch (error) {
        throw error;
    }
   
}

const addNewReport = async(room, image, rating,status_report, description, date,incident,user)=>{
    try {
        return await ReportService.addNewReport(room, image, rating,status_report, description, date,incident,user);
    } catch (error) {
        return false;
    }
}
const updateReporttById = async(id, room, image, rating,status_report, description,incident, user)=>{
    try {
        return await ReportService.updateReporttById(id, room, image, rating,status_report, description, incident, user);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { getAllReport,getReportById, deleteReportById, addNewReport ,updateReporttById}