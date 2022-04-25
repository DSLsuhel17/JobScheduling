const db = require('../../config/dbconfig');

function formater(dateVal) {
    let date = "" +dateVal.getFullYear()+ "-";

    if (dateVal.getMonth() < 10) {
      date += "0"
    } 

    // if(dateVal.getDate() < 10) {
    //      date += "0"
    // }
    
    date += dateVal.getMonth() + 1 + "-" + dateVal.getDate();

    return date;
  }


exports.valideDate = async function(res,date)  {
      
    var MyHoliday=[];
    console.log("d : " + date);
    sql = "SELECT date FROM job_schema.holiday_master";
    try {
        const result = await db.query(sql)
        console.log(result.rows);
        
        for(var i=0; i<result.rows.length; i++)
        {
            MyHoliday.push(formater(new Date(result.rows[i].date)))
        }
        console.log("arr " + MyHoliday)
        res.send(toValideDate(date,MyHoliday));
        console.log((toValideDate(date,MyHoliday)));
    } catch (error) {
       new Error(error); 
    }   
}

function toValideDate(date,myHolidays) {
    var newDate = new Date(date)
    if(newDate.getDay() == 4) {
        return -1;
    }
    
    for(i=0; i<myHolidays.length; i++) {
        if(date == myHolidays[i]) {
            return -1;
        }
    }
    return 1;
}