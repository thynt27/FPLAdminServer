const IncidentService = require('./IncidentService');

const getAllIncident = async () => {
    try {
        return await IncidentService.getAllIncident();
    } catch (error) {
        throw error;
    }

}
const getIncidentById = async (id) => {
    try {
        return await IncidentService.getIncidentById(id);
    } catch (error) {
        return null;
    }
}

const addIncident = async (name_incident) => {
    try {
        return await IncidentService.addIncident(name_incident);
    } catch (error) {
        throw error;
    }
}


module.exports = { getAllIncident, getIncidentById, addIncident }