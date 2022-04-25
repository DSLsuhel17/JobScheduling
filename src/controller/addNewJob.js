const db = require('../../config/dbconfig');


exports.createNewJob = (req,res) => {

    console.log(req.body)
    var jobname = req.body.jobname;
    var mid = req.body.mid;
    var shift = req.body.shift;
    var status = req.body.status;
    var job_count = req.body.job_count;
    var schedule_date = req.body.schedule_date;
    var latest_schedule_date = req.body.latest_schedule_date;
    var rescheduling_reason = req.body.rescheduling_reason;

    let sql = "INSERT INTO job_schema.job_master (jobname,status,schedule_date,latest_schedule_date,rescheduling_reason,job_count,mid,shift) VALUES ('"+jobname+"','"+status+"','"+schedule_date+"','"+latest_schedule_date+"','"+rescheduling_reason+"','"+job_count+"','"+mid+"','"+shift+"')"

    db.query(sql,(err,result) => {
        if(err) {
            console.log(err)
            res.status(400).json(err)
        } else {
            console.log("data inserted");
            res.status(200).json(result)
        }
    })   
}