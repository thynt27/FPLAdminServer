const StatusService = require('./StatusService');

const getAllStatus = async () => {
    try {
        return await StatusService.getAllStatus();
    } catch (error) {
        throw error;
    }
    
}
const getStatusById = async(id)=>{
    try {
        return await StatusService.getStatusById(id);
    } catch (error) { 
        return null;
    }
}


module.exports = { getAllStatus,getStatusById}