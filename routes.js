
// install multer package
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({  // destination
    destination:(req,file,cb)=> {
        cb(null, './uploads');
    },
    filename:(req,file,cb)=>{  // filename
        cb(null,Date.now()+'.jpg') // timestap.jpg
    }
})

const upload = multer({
    storage:storage,
})

router.route('/addimage').post(upload.single('img'),(res,req)=>{
    try{
        res.json({path: req.file.filename});
    }
    catch(e)
    {
        return res.json({error:e});
    }
})

module.exports = router;