const db = require('../../config/dbconfig');

const newJob = require('../controller/createNewJob')



exports.getJobSchedule = (req, res) => {

    let sql = 'SELECT jobid,jobname,machine_name,status,job_count,j.shift,schedule_date,latest_schedule_date,rescheduling_reason FROM job_schema.job_master "j", job_schema.machine_master "m"WHERE j.mid = m.mid ORDER BY jobid';

    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result.rows);
        }
    })
}

// This function will query the database to get the information about jobs taking the required data like machine_id and shift from the client side.
// after getting the data from the database it will check the condition required for verification.
// after verification if the condition is satisfied it will redirect to schedule the job..  
exports.jobByCount = async function (req, res) {

    var shift = req.body.shift
    var mid = req.body.mid

    var values = [mid, shift];

    sql = "SELECT jobid,job_count,mid,shift FROM job_schema.job_master WHERE mid = $1 and shift = $2"

    try {
        const result = await db.query(sql, values);
        console.log("aa=", result.rows);
        // res.json(result.rows)
        var availableCap = calAvailCap(result.rows)

        if (availableCap < req.body.job_count) {
            console.error(new Error(
                `Capacity exceded :
                Your entered job_count/capacity : ${req.body.job_count}
                Available capacity is :   ${availableCap}`
            ));
        } else {
            newJob.createNewJob(req, res);
        }
    } catch (error) {
        throw new Error('data not found...');
    }
}

// This function will calculate and return the available capacity to varify the jobcount for a  machine and schedule a job 
function calAvailCap(dataArr) {
    var totCapacity = 0
    var capacityConsumed = 0

    for (i = 0; i < dataArr.length; i++) {
        capacityConsumed += dataArr[i].job_count;
        totCapacity = totalCapacity(dataArr[i].mid, dataArr[i].shift);
    }
    console.log("totCapacity: " + totCapacity)
    var available = totCapacity - capacityConsumed;
    console.log("capacityConsumed : " + capacityConsumed);
    console.log("Available Capacity1: " + available);
    return available;

}

// This function will return the totalcapacity required to calculate the available capacity.
function totalCapacity(mid, shiftid) {

    if (shiftid == 1 || shiftid == 2) {
        switch (mid) {
            case 1:
                if (shiftid == 1)
                    return 4000;
                return 3000;

            case 2:
                if (shiftid == 1)
                    return 2000;
                return 2000;

            case 3:
                if (shiftid == 1)
                    return 20000;
                return 25000;

            case 4:
                if (shiftid == 1)
                    return 3000;
                return 2500;

            case 5:
                if (shiftid == 1)
                    return 6000;
                return 4000;

            default:
                // console.log("Please enter a valid id...")
                return -1;
        }
    }
    return -1;
}






// async function valideDate(date) {
//     var MyHoliday = [];
//     console.log("d : " + new Date(date));
//     sql = "SELECT date FROM job_schema.holiday_master";
//     try {
//         const result = await db.query(sql)
//         for (var i = 0; i < result.rows.length; i++) {
//             MyHoliday.push(result.rows[i].date)
//         }
//         var val = toValideDate(new Date(date), MyHoliday);

//     } catch (error) {
//         new Error(error);
//     }
//     console.log("val :" + val);
//     return val;
// }


// function toValideDate(date, myHolidays) {

//     console.log(myHolidays)
//     console.log(new Date(myHolidays[0]))
//     var newDate = new Date(date)
//     if (newDate.getDay() === 4) {
//         return -1;
//     }

//     for (i = 0; i < myHolidays.length; i++) {
//         if (date === new Date(myHolidays[i])) {
//             return -1;
//         }
//     }
//     return 1;
// }









