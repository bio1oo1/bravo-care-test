const sequelize = require('../models/sequelize');

/**
 * Query 5
 *
 * Get the nurse’s ID, nurse’s name, the nurse type, and the total number of jobs
 * that each nurse can possibly still get hired for. Each nurse can only be hired
 * one time for each matching job and if the nurse is already hired for a job,
 * that job should not count towards the total. If a job id is already completely
 * filled, that job should also not count towards the total.
 * Order the results by the nurse_id in ascending order.
 * @returns
 */
const getPossibleJobCount = async function () {
  try {
    const query = `
      WITH t1 AS (
        SELECT j.job_id, j.nurse_type_needed,
          j.total_number_nurses_needed-t1.hired_count AS remaining_spots
        FROM jobs j
        LEFT JOIN (
          SELECT job_id, COUNT(nurse_id) as hired_count
          FROM nurse_hired_jobs
          GROUP BY job_id
        ) t1 ON t1.job_id = j.job_id
        WHERE j.total_number_nurses_needed > t1.hired_count
      )
      
      SELECT nurse_id, nurse_name, CAST(SUM(remaining_spots) AS INTEGER) AS possible_job_count
      FROM (
        SELECT n.nurse_id, n.nurse_name, t1.remaining_spots
        FROM nurses n
        LEFT JOIN nurse_hired_jobs nhj ON nhj.nurse_id = n.nurse_id
        LEFT JOIN t1 ON (n.nurse_type = t1.nurse_type_needed AND (nhj.job_id IS NULL OR nhj.job_id != t1.job_id))
      ) t2
      GROUP BY nurse_id, nurse_name
      ORDER BY nurse_id
    `;
    const [result] = await sequelize.query(query);
    console.log(result);
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
  getPossibleJobCount
};
