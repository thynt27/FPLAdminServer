
const StatusModel = require('./StatusModel');

const getAllStatus = async () => {
  try {
    return await StatusModel.find();
  } catch (error) {
    console.log('Get all Status error', error);
    throw error;
  }
}
const getStatusById = async (id) => {
  try {
    return await StatusModel.findById(id)

  } catch (error) {
    console.log('Get Status by id error', error);
    return null;
  }
}


module.exports = { getAllStatus, getStatusById, }
