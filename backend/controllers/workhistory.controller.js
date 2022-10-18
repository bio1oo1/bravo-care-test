const sequelize = require('../models/sequelize');

const getHiringPriorityScore = async function (facilityId) {
  try {
    const query = `
      WITH t1 AS (SELECT nurse_id, COUNT(*) AS no_call_no_show_count
      FROM clinician_work_history
      WHERE no_call_no_show = TRUE
      GROUP BY nurse_id)
      
      
      SELECT t3.nurse_id, t3.score1 + 
        (CASE WHEN t1.no_call_no_show_count IS NULL THEN 0 
        ELSE t1.no_call_no_show_count * -5 END) AS score
      FROM (
        SELECT nurse_id, SUM(
          (CASE WHEN worked_shift=TRUE THEN 1
              ELSE 0 END) +
          (CASE WHEN call_out=TRUE THEN -3
              ELSE 0 END)
        ) AS score1
        FROM clinician_work_history t2
        WHERE facility_id = ${facilityId}
        GROUP BY nurse_id
      ) t3
      LEFT JOIN t1 ON t1.nurse_id = t3.nurse_id
      ORDER BY score DESC, nurse_id ASC
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
  getHiringPriorityScore
};
