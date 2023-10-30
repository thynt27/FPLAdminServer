
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

const addIncident = async (name_incident) => {
  try {
    const newIncident = { name_incident };
    const n = new IncidentModel(newIncident);
    await n.save();
    return true;
  } catch (error) {
    console.log('Add incident error', error);
    return false;
  }


}


module.exports = { getAllIncident, getIncidentById, addIncident }
