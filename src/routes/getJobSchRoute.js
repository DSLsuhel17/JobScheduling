const express = require('express')
const router = express.Router()

const getJobController = require('../controller/getJobSchController');

router.get('/getjobschedule', getJobController.getJobSchedule);
router.post('/getjobschedule/jobsbyjobcount', getJobController.jobByCount)
// router.get('/getjobschedule/addnewjob',getJobController.getJobByJobCount)
// router.post('/getjobschedule/addnewjob',newJobController.createNewJob)



// router.get('/getjobschedule/capacity',getJobController.availableCapacity)

module.exports = router;