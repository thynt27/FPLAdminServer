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
const getReportByIduser = async(user)=>{
    try {
        return await ReportService.getReportByIduser(user);
    } catch (error) { 
        return null;
    }
}
const getReportByIdstatus = async(status)=>{
    try {
        return await ReportService.getReportByIdstatus(status);
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
const updateReporttById = async(id, room, image, rating,status_report, description,receiver,incident, user)=>{
    try {
        return await ReportService.updateReporttById(id, room, image, rating,status_report, description,receiver,incident, user);
    } catch (error) {
        console.log(error);
        return false;
    }
}
const updateStarHandler = async (id, star,rating_description) => {
    try {
        return await ReportService.updateStar(id, star,rating_description);
    } catch (error) {
        console.log(error);
        return false;
    }
  };


module.exports = { updateStarHandler,getAllReport,getReportById, deleteReportById, addNewReport ,updateReporttById,getReportByIduser,getReportByIdstatus}
