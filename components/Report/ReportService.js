
const ReportModel = require('./ReportModel');
// /{ status_report: { $ne: "653b8473900c3796a66d6642" } }
const getAllReport = async () => {
  try {
    return await ReportModel.find().populate('incident','name_incident ') 
    .populate('user','name')
    .populate('status_report','name_status')
    .sort({ formattedDate: -1,status_report: 1  });
  } catch (error) {
    console.log('Get all reports error', error);
    throw error;
  }
}
const getReportById = async (id) => {
  try {
    return await ReportModel.findById(id).populate('incident', 'name_incident ').populate('status_report', 'name_status').populate('user', 'name')

  } catch (error) {
    console.log('Get reports by id error', error);
    return null;
  }
}
const getReportByIduser = async (user) => {
  try {
    return await ReportModel.find({ user: user }).populate('incident', 'name_incident ').populate('status_report', 'name_status')

  } catch (error) {
    console.log('Get reports by iduser error', error);
    return null;
  }
}
const getReportByIdstatus = async (status) => {
  try {
    return await ReportModel.find({ status_report: status })
      .populate('incident', 'name_incident ')
      .populate('status_report', 'name_status')
      .populate('user', 'name')

  } catch (error) {
    console.log('Get reports by idstatus error', error);
    return null;
  }
}

const getReportByDate = async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const reports = await ReportModel.find({
      date: {
        $gte: sevenDaysAgo,
        $lt: new Date(),
      }
    })
    .populate('incident', 'name_incident')
    .populate('status_report', 'name_status')
    .populate('user', 'name');

    const result = reports.map(report => {
      return {
        nameIncident: report.incident.name_incident,
        reportDate: report.date,
        statusReport: report.status_report.name_status,
        userName: report.user.name
      };
    });

    return result;
  } catch (error) {
    console.log('Get reports in the last 7 days error', error);
    throw error;
  }
}

const getReportByMonth = async () => {
  try {
    const currentYear = 2023; 
    const currentMonth = 11;  

    const startOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`;
    const endOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-31T23:59:59.999Z`;

    const reports = await ReportModel.find({
      date: {
        $gte: new Date(startOfMonth),
        $lte: new Date(endOfMonth),
      }
    })
    .populate('incident', 'name_incident')
    .populate('status_report', 'name_status')
    .populate('user', 'name');

    const result = reports.map(report => {
      return {
        nameIncident: report.incident.name_incident,
        reportDate: report.date,
        statusReport: report.status_report.name_status,
        userName: report.user.name
      };
    });

    return result;
  } catch (error) {
    console.log('Get reports by month error', error);
    throw error;
  }
}




const getReportCountByStatus = async () => {
  try {
    const statusCounts = await ReportModel.aggregate([
      {
        $lookup: {
          from: 'status', 
          localField: 'status_report',
          foreignField: '_id',
          as: 'statusInfo'
        }
      },
      {
        $unwind: '$statusInfo'
      },
      {
        $group: {
          _id: '$statusInfo.name_status', 
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {};
    statusCounts.forEach((count) => {
      result[count._id] = count.count;
    });

    return result;
  } catch (error) {
    console.log('Get report counts by status error', error);
    throw error;
  }
}



const getReportCountByIncident = async () => {
  try {
    const incidentCounts = await ReportModel.aggregate([
      {
        $lookup: {
          from: 'incidents',
          localField: 'incident',
          foreignField: '_id',
          as: 'incidentInfo'
        }
      },
      {
        $unwind: {
          path: '$incidentInfo',
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $group: {
          _id: '$incidentInfo.name_incident', 
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {};
    incidentCounts.forEach((count) => {
      result[count._id] = count.count;
    });

    // Bao gồm các loại sự cố không có báo cáo
    const allIncidents = [
      "Vệ sinh phòng học",
      "Cơ sở vật chất",
      "Thiết bị mạng",
      "Góp ý phòng học",
      "Sự cố khác"
    ];

    allIncidents.forEach((incident) => {
      if (!result.hasOwnProperty(incident)) {
        result[incident] = 0;
      }
    });

    return result;
  } catch (error) {
    console.log('Get report counts by incident error', error);
    throw error;
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
const addNewReport = async (room, image, rating, status_report, description, date, incident, user) => {
  try {
    const newReport = { room, image, rating, status_report, description, date, incident, user }
    const p = new ReportModel(newReport);
    await p.save();
    return true;
  } catch (error) {
    console.log('Add new reports error:', error);
    return false;
  }
}
const updateReporttById = async (id, room, image, rating, status_report, description, receiver, incident, user) => {
  try {
    const item = await ReportModel.findById(id);
    if (item) {
      item.room = room ? room : item.room;
      item.image = image ? image : item.image;
      item.rating = rating ? rating : item.rating;
      item.status_report = status_report ? status_report : item.status_report;
      item.description = description ? description : item.description;
      item.receiver = receiver ? receiver : item.receiver;
      item.incident = incident ? incident : item.incident;
      item.user = user ? user : item.user;
      // item.rating.star = star !== undefined ? star : item.rating.star;
      await item.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update reports by id error: ", error);
    return false;
  }
}
const updateStar = async (id, star,rating_description) => {
  try {
    const item = await ReportModel.findById(id);
    if(item)
    {
      item.rating.star = star ? star:item.rating.star;
      item.rating.rating_description = rating_description? rating_description:item.rating.rating_description;
      await item.save();
      return true;
      
      
    }

    return false;
  } catch (error) {
    return false;
    throw error;
  }
};



module.exports = {
  getAllReport,
  getReportById,
  deleteReportById,
  addNewReport,
  updateReporttById,
  getReportByIduser,
  getReportByIdstatus,
  getReportByDate,
  getReportCountByStatus,
  getReportCountByIncident,
  getReportByMonth,
  updateStar
}
