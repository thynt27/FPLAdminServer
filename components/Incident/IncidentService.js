
const IncidentModel = require('./IncidentModel');

const getAllIncident = async () => {
  try {
    return await IncidentModel.find();
  } catch (error) {
    console.log('Get all reports error', error);
    throw error;
  }
}
const getIncidentById = async (id) => {
  try {
    return await IncidentModel.findById(id)

  } catch (error) {
    console.log('Get reports by id error', error);
    return null;
  }
}


module.exports = { getAllIncident, getIncidentById, }
