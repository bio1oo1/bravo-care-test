const sequelize = require('../models/sequelize');

/**
 * Query 1
 * Get Facility List
 * @returns [{facility_id, facility_name}]
 */
const getAll = async function () {
  try {
    const [result] = await sequelize.query('SELECT * FROM facilities ORDER BY facility_id ASC');
    return result;
  } catch (e) {
    console.log(e);
    return {
      err: true,
      msg: 'DB Error'
    };
  }
};

/**
 * Query 6
 *
 * Get the name of each facility and the name of the nurse that has been
 * hired for the most number of shifts at each of those facilities.
 * Order the results by the facility_name in ascending order
 * @returns
 */
const getMostHiredNurseList = async function () {
  try {
    const query = `
      SELECT f.facility_id, f.facility_name, n.nurse_id, n.nurse_name,  CAST(t1.hired_count AS  INTEGER)
      FROM (
        SELECT j.facility_id, nhj.nurse_id, COUNT(*) AS hired_count, DENSE_RANK() OVER(ORDER BY COUNT(*) DESC) AS nurse_hired_rank
        FROM jobs j
        LEFT JOIN nurse_hired_jobs nhj ON j.job_id = nhj.job_id
        GROUP BY j.facility_id, nhj.nurse_id
      ) t1
      LEFT JOIN facilities f ON t1.facility_id = f.facility_id
      LEFT JOIN nurses n ON t1.nurse_id = n.nurse_id
      WHERE t1.nurse_hired_rank = 1
      ORDER BY t1.facility_id
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
  getAll,
  getMostHiredNurseList
};
