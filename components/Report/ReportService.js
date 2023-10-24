
const ReportModel = require('./ReportModel');

const getAllReport = async () => {
  try {
    return await ReportModel.find().populate('incident','name_incident ');
  } catch (error) {
    console.log('Get all reports error', error);
    throw error;
  }
}
const getReportById = async (id) => {
  try {
    return await ReportModel.findById(id)

  } catch (error) {
    console.log('Get reports by id error', error);
    return null;
  }
}
const deleteReportById = async (id) => {
  try {
    await ReportModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('Delete reports by id error', error);
    return false;
  }

}
const addNewReport = async (room, image, rating,status_report, description, date, incident, user) => {
  try {
    const newReport = { room, image, rating,status_report, description, date, incident,user }
    const p = new ReportModel(newReport);
    await p.save();
    return true;
  } catch (error) {
    console.log('Add new reports error:', error);
    return false;
  }
}
const updateReporttById = async (id, room, image, rating,status_report, description, incident, user) => {
  try {
    const item = await ReportModel.findById(id);
    if (item) {
      item.room = room ? room : item.room;
      item.image = image ? image : item.image;
      item.rating = rating ? rating : item.rating;
      item.status_report = status_report ? status_report : item.status_report;
      item.description = description ? description : item.description;
      item.incident = incident ? incident : item.incident;
      item.user = user ? user : item.user;
      await item.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update reports by id error: ", error);
    return false;
  }
}



module.exports = { getAllReport, getReportById, deleteReportById, addNewReport, updateReporttById }
