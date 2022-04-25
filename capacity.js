


class JobsInfo {
    constructor (jobid,capacity) {
        this.capacity = capacity;
        this.jobid = jobid;
    }
}



function getJobs(date,shiftid,mid) {
    sql = "Select "
    const job1 = new JobsInfo(1,400)
    const job2 = new JobsInfo(2,320)
    const job3 = new JobsInfo(3,300)
    const allJobs = [job1,job2,job3]

    return allJobs;

}

// console.log(getJobs(1,2,3))

function totalCapacity(mid,shiftid) {
    if (shiftid == 1 || shiftid == 2) {
        switch(mid) {
        case 1:
            if(shiftid == 1) 
                return 4000;
            return 3000;
        
        case 2:
            if(shiftid == 1) 
                return 2000;
            return 2000;
        
        case 3:
            if(shiftid == 1) 
                return 20000;
            return 25000;

        case 4:
            if(shiftid == 1) 
                return 3000;
            return 2500;
        
        case 5:
            if(shiftid == 1) 
                return 6000;
            return 4000;

        default :
            // console.log("Please enter a valid id...")
            return "Pease select the right option";
    }
    }
    return "Please enter valid shift id..."   
}
// console.log(totalCapacity(1,1));



function availableCapacity(dataArr) {
    let capacityConsumed  = 0
    // let jobs = getJobs(date,shiftid,mid)
    // console.log(jobs[1].capacity);

    for(i=0;i<dataArr.length;i++) {
        capacityConsumed += dataArr[i].capacity;
    }
    console.log(capacityConsumed);
    return "Remaining Capacity: ", totalCapacity(mid,shiftid) - capacityConsumed;
    // console.log(totalCapacity(mid,shiftid) - capacityConsumed);
}

// availableCapacity(1,2,3)
// console.log(availableCapacity(1,2,1));



































// schedule jobs
function scheduleJob(date,shiftid,machineid,requestedJob) {
    
    if(requestedJob.capacity <= 0) {
        return new Error("Capacity cannot be zero or negative.Passed capacity is : " + requestedJob.capacity);
    }

    let availableCapacity = availableCapacity(date,shiftid,machineid)
    // console.log(availableCapacity);
    if(availableCapacity < requestedJob.capacity) {
        return new Error("Capacity exceeded.Available capacity is : " + availableCapacity + " requested job capacity is : " + requestedJob.capacity)
    }else{
        return "Job has been scheduled...";
    }
}

// const invalidjob = new JobsInfo(1,-1)
const invalidjob1 = new JobsInfo(1,0)
const invalidjob2 = new JobsInfo(1,3300)
const invalidjob3 = new JobsInfo(1,200)
// scheduleJob(1,1,1,getJobs)
// console.log(scheduleJob(1,1,1,invalidjob30));


function isDateValid(date) {
    let newDate = new Date(date)
    if(newDate.getDay() == 4) {
        return false;
    }
    myHolidays = ["2012-01-02", "2012-02-20", "2012-04-06", "2012-05-21", "2012-07-02", "2012-12-25", "2012-09-03"];
    for(i=0; i<myHolidays.length; i++) {
        if(date == myHolidays[i]) {
            return false;
        }
    }
    return true;
}
console.log(isDateValid("2012-01-03"));

