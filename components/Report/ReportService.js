
const ReportModel = require('./ReportModel');

const getAllReport = async () => {
  try {
    return await ReportModel.find().populate('incident','name_incident');
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
const addNewReport = async (room, image, rating, description, date, incident, User_id) => {
  try {
    const newReport = { room, image, rating, description, date, incident,User_id }
    const p = new ReportModel(newReport);
    await p.save();
    return true;
  } catch (error) {
    console.log('Add new reports error:', error);
    return false;
  }
}
const updateReporttById = async (id, room, image, rating, description, incident, User_id) => {
  try {
    const item = await ReportModel.findById(id);
    if (item) {
      item.room = room ? room : item.room;
      item.image = image ? image : item.image;
      item.rating = rating ? rating : item.rating;
      item.description = description ? description : item.description;
      item.incident = incident ? incident : item.incident;
      item.User_id = User_id ? User_id : item.User_id;
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
