const db = require('../../config/dbconfig');

exports.availableCapacity = async function(req,res,data)  {

    sql = "SELECT capacity from job_schema.shift_capacity_master where mid = '"+data.mid+"' and shift = '"+data.shift+"'";
    try {
        const result = await db.query(sql)
            
        console.log("capacity : " + result.rows[0].capacity);
        // res.status(200).json(result);
        res.send(result);
        // return result.rows[0].capacity;
    } catch (error) {
        new Error('Data not found...')
    }








//     console.log(mid + " aaaaa " + shift)

//    db.query(totalCapacity(mid,shift), (err,result) => {
//          if (err) {
//             res.status(400).send(err);
//         } else {
//             console.log("capacity : " + result.rows[0].capacity);
//             // res.status(200).json(result.rows[0].capacity);
//             return result.rows[0].capacity;
//             // return result;
//         }
//     })
}

