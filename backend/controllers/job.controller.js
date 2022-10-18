const sequelize = require('../models/sequelize');

/**
 * Query 4
 *
 * Get the number of remaining spots each job has. The remaining number of spots will
 * be equal to the total number of nurses needed minus the number of nurses that are
 * already hired for that job. Order the results by the job_id in ascending order
 * @returns
 */
const getRemainingSpots = async function () {
  try {
    const query = `
      SELECT j.*, 
        CAST(t1.hired_count AS INTEGER), 
        CAST(j.total_number_nurses_needed-t1.hired_count AS INTEGER) AS remaining_spots
      FROM jobs j
      LEFT JOIN (
        SELECT job_id, COUNT(nurse_id) as hired_count
        FROM nurse_hired_jobs
        GROUP BY job_id
      ) t1 ON t1.job_id = j.job_id
      ORDER BY j.job_id
    `;
    const [result] = await sequelize.query(query);
    return result;
  } catch (e) {
    console.log(e);
    return {
      err: true,
      msg: 'DB Error'
    };
  }
};

module.exports = {
  getRemainingSpots
};
