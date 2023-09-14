import userAdminModel from "../models/userAdminModel.js"
import userStudentModel from "../models/userStudentModel.js"
import userStaffModel from "../models/userStaffModel.js"
import userFacultyModel from "../models/userFacultyModel.js"
import userVisitorModel from "../models/userVisitorModel.js"


/**
 * Route: /profile
 * Desc: get profile details 
 */
export const profile = async (req, res) => {

    res.send("Display profile page")
}


/**
 * Route: /profile/edit
 * Desc: request to edit profile
 */
export const editProfile = async (req, res) => {

    const { name, email} = req.body

    const emailDomains = [
        "@gmail.com",
        "@yahoo.com",
        "@hotmail.com",
        "@aol.com",
        "@outlook.com",
        ];

    var result = {}    
    var newResult={}
 
 
 
        //check name length
        if (name.length < 2) {
          return res
            .status(404)
            .json({ message: "Name must be atleast 2 characters long." });
        }
 
        // check email format
        if (!emailDomains.some((v) => email.indexOf(v) >= 0)) {
          return res.status(404).json({
         message: "Please enter a valid email address",
       })};




     /**
     * getting remaing fields 
     * from requests.
     */
     var {
        branch,
        subjects,
        intrest,
        enrollNo,
        designation,
        bio,
        education,
        intrest,
        mobile
     } = req.body



       /**
        * checking field types
        * to avoid sql attacks
        */
       if (typeof name !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof email !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }
       
      if (typeof branch !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof subjects !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof intrest !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof enrollNo !== "number") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof designation !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof bio !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof education !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof intrest !== "string") {
        res.status(400).json({ status: "error" });
        return;
      }

      if (typeof mobile !== "number") {
        res.status(400).json({ status: "error" });
        return;
      }



     // conditions to figure out role
    if(req.role === 'admin'){

           
           // update userAdmin in database 
             result = await userAdminModel.updateOne({
                name,
                email,
                branch,
               });

             
         newResult = await userAdminModel.findOne({email})

    }
    else if(req.role === 'student'){


         // update userStudent in database 
            result = await userStudentModel.updateOne({
                name,
                email,
                branch,
                intrest,
                enrollNo,
                mobile
             });

         
         newResult = await userStudentModel.findOne({email})
    }
    else if(req.role === 'staff'){
          


        //update staff in database
            result = await userStaffModel.updateOne({
                name,
                email,
                branch,
                designation,
                bio,
                mobile
             });

         newResult = await userStaffModel.findOne({email})
    }
    else if(req.role === 'faculty'){


        //update faculty in database
        result = await userFacultyModel.updateOne({
            name,
            email,
            branch,
            subjects,
            designation,
            education,
            bio,
            intrest,
            mobile
         });

         
         newResult = await userFacultyModel.findOne({email})
    }
    else if(req.role == 'visitor'){
         

        //update visitor in database
        result = await userVisitorModel.updateOne({
            name:name,
            email:email,
            bio:bio
         });

         newResult = await userVisitorModel.findOne({email})
    }



    if(result){

        
        res.json({
            msg: "user "+req.role+" edited successfully",
            user: newResult
    })
     }
    
}
