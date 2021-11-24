const express = require('express');
const router = express.Router();
const multer = require('multer');

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../helpers/auth');
const path = require('path');
const util = require("util");
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })

// add product api
router.post(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin),
  upload.single('image'),
  async (req, res) => {
    try {
      
      let imgUrl = '';
      const file = req.file;
      if (file) {
       
        cloudinary.config({ 
          cloud_name: 'paperapp5478248', 
          api_key: '942336965891197', 
          api_secret: 'mKxFoWwgXq2WyCtkLomqrY0jxh0' 
        });

        const cloudinaryUpload = await cloudinary.v2.uploader.upload(file.path);
          
        const url = cloudinaryUpload.url;
        if (imgUrl === '') imgUrl = url;
        console.log(url);

      }

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        imgUrl: imgUrl
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);


module.exports = router;
