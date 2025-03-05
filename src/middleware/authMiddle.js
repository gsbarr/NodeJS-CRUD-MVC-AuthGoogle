require('dotenv').config();
const passport = require('passport');

const authMiddle = {};


authMiddle.estaLogueado = async (req, res, next) => {


    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("connect.sid=")).slice(12);
    console.log("cookie: "+cookieJWT);

/*
    if(req.user && req.user.length > 0){
        console.log('LOGUEA');
        next();
    }
    else {
        console.log('NO LOGUEA');
        //console.log(req)
        res.sendStatus(401);
    }*/

        if(cookieJWT.length > 0){
            console.log('LOGUEA');
            next();
        }
        else {
            console.log('NO LOGUEA');
            //console.log(req)
            res.sendStatus(401);
        }    

  }



module.exports = authMiddle;

