const express = require('express');
const router = express.Router();
const FacilityController = require('../controllers/facility.controller');
const WorkHistoryController = require('../controllers/workhistory.controller');
const JobController = require('../controllers/job.controller');
const NurseController = require('../controllers/nurse.controller');

// Query 1
router.get('/facility/all', async function (req, res) {
  const result = await FacilityController.getAll();
  if (!result.err) return res.send(result);
  return res.status(500).send(result);
});

// Query 2
router.get('/workhistory/:facilityId', async function (req, res) {
  const facilityId = Number(req.params.facilityId);
  if (!Number.isInteger(facilityId)) {
    return res.status(400).send({
      err: true,
      msg: 'Facility ID is not valid'
    });
  }
  const result = await WorkHistoryController.getHiringPriorityScore(facilityId);
  if (!result.err) return res.send(result);
  return res.status(500).send(result);
});

// Query 4
router.get('/job/getRemainingSpots', async function (req, res) {
  const result = await JobController.getRemainingSpots();
  if (!result.err) return res.send(result);
  return res.status(500).send(result);
});

// Query 5
router.get('/nurse/getPossibleJobCount', async function (req, res) {
  const result = await NurseController.getPossibleJobCount();
  if (!result.err) return res.send(result);
  return res.status(500).send(result);
});

// Query 6
router.get('/facility/getMostHiredNurseList', async function (req, res) {
  const result = await FacilityController.getMostHiredNurseList();
  if (!result.err) return res.send(result);
  return res.status(500).send(result);
});

module.exports = router;
