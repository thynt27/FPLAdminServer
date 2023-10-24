const IncidentService = require('./IncidentService');

const getAllIncident = async () => {
    try {
        return await IncidentService.getAllIncident();
    } catch (error) {
        throw error;
    }
    
}
const getIncidentById = async(id)=>{
    try {
        return await IncidentService.getIncidentById(id);
    } catch (error) { 
        return null;
    }
}


module.exports = { getAllIncident,getIncidentById}