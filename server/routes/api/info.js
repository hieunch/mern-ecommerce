const express = require('express');
const router = express.Router();
const fs = require('fs');
// const multer = require('multer');

// Bring in Models & Helpers
const auth = require('../../middleware/auth');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//         cb(null, false);
//         const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//         err.name = 'ExtensionError'
//         return cb(err);
//     }
// }

// var upload = multer({ storage: storage, fileFilter: fileFilter })

router.get('/', async (req, res) => {
  try {
    // console.log('/api/info');
    let rawdata = fs.readFileSync('./storeinfo.json');
    let storeinfo = JSON.parse(rawdata);
    // console.log(storeinfo);

    res.status(200).json({
      info: storeinfo
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    // console.log('/api/info');
    // const name = req.body.name;
    // const address = req.body.address;
    // const phoneNumber = req.body.phoneNumber;
    // const email = req.body.email;
    // const shopeeUrl = req.body.shopeeUrl;
    // const lazadaUrl = req.body.lazadaUrl;
    // const tikiUrl = req.body.tikiUrl;

    let storeinfo = req.body.info;//{name, address, phoneNumber, email, shopeeUrl, lazadaUrl, tikiUrl}

    let data = JSON.stringify(storeinfo);
    fs.writeFileSync('./storeinfo.json', data);


    res.status(200).json({
      success: true,
      message: 'Your profile is successfully updated!',
      // in: userDoc
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
