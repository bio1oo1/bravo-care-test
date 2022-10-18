import http from '../http-common';

// Query 1
const getFacilityList = async () => {
  return await http.get('/facility/all');
};

// Query 2
const getWorkHistoryPriorityScore = facilityId => {
  return http.get(`/workhistory/${facilityId}`);
};

// Query 4
const getRemainingSpotsPerJob = facilityId => {
  return http.get(`/job/getRemainingSpots`);
};

// Query 5
const getPossibleJobCountPerNurse = facilityId => {
  return http.get(`/nurse/getPossibleJobCount`);
};

// Query 6
const getMostHiredNurseListPerFacility = facilityId => {
  return http.get(`/facility/getMostHiredNurseList`);
};

const DataService = {
  getFacilityList,
  getWorkHistoryPriorityScore,
  getRemainingSpotsPerJob,
  getPossibleJobCountPerNurse,
  getMostHiredNurseListPerFacility
};

export default DataService;
