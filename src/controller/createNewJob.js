const db = require('../../config/dbconfig');



// This function will take the job details required to create the job, after verifying the machine capacity count it will create the job if conditons is satisfied  and display the output on the client side 
exports.createNewJob = (req, res) => {

    var jobname = req.body.jobname;
    var mid = req.body.mid;
    var shift = req.body.shift;
    var status = req.body.status;
    var job_count = req.body.job_count;
    var schedule_date = (req.body.schedule_date);
    var latest_schedule_date = req.body.latest_schedule_date;
    var rescheduling_reason = req.body.rescheduling_reason;

    let sql = "INSERT INTO job_schema.job_master (jobname,status,schedule_date,latest_schedule_date,rescheduling_reason,job_count,mid,shift) VALUES ('" + jobname + "','" + status + "','" + schedule_date + "','" + latest_schedule_date + "','" + rescheduling_reason + "','" + job_count + "','" + mid + "','" + shift + "')"

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        } else {
            console.log("New Job created sucessfully...");
            res.status(200).json({ message: "New Job created sucessfully...", result: result.rows });
        }
    })
}
