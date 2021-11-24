const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const Mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

// Bring in Models & Helpers
const News = require('../../models/news');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const Wishlist = require('../../models/wishlist');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../helpers/auth');
const fs = require('fs');

var Buffer = require('buffer').Buffer

// fetch news slug api
router.get('/item/:slug', async (req, res) => {
  try {
    console.log("/api/news/item/slug");
    const slug = req.params.slug;

    const news = await News.findOne({ slug });
    console.log(news);

    if (!news) {
      return res.status(404).json({
        message: 'No news found.'
      });
    }

    res.status(200).json({
      news: news
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store news by advancedFilters api
router.post('/list', async (req, res) => {
  try {
    let {
      pageNumber: page = 1
    } = req.body;
    console.log("/api/news/list");

    const pageSize = 8;
    
    const newsCount = await News.countDocuments();
    const paginateQuery = [
      { $sort : { "created" : -1 }},
      { $skip: pageSize * (newsCount > 8 ? page - 1 : 0) },
      { $limit: pageSize }
    ];
    const listNews = await News.aggregate(
      paginateQuery
    );

    res.status(200).json({
      listNews: listNews,
      totalNews: newsCount,
      page: page,
      pages:
        newsCount > 0
          ? Math.ceil(newsCount / pageSize)
          : 0
    });
    // }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.get('/list/select', auth, async (req, res) => {
  try {
    const news = await News.find({}, 'name');

    res.status(200).json({
      news
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

function dataURLtoFile(dataString, filename) {
  console.log(dataString.substring(0,50));
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)/),
    response = {};

  if (!matches || matches.length !== 3) {
    return false;
    // return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  fs.writeFile(filename, response.data, function(err) { console.log(err) });
  return true;
}

// add news api
router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const id = req.body.id;
      const keywords = req.body.keywords;
      const content = req.body.content;
      const title = req.body.title;

      if (!id) {
        return res
        .status(400)
        .json({ error: 'Missing news id.' });
      }

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: 'You must enter title and content.' });
      }

      // if (!price) {
      //   return res.status(400).json({ error: 'You must enter a price.' });
      // }

      const foundNews = await News.findOne({ id });

      if (foundNews) {
        return res
        .status(400)
        .json({ error: 'This news id is already in use.' });
      }

      let listImages = content.match('\\<img src=".*?">'); 
      let newContent = content;
      let thumbnail = "";
      if (listImages) for (const imgTag of listImages) {
        let base64 = imgTag.match('"(.*?)"')[1];
        if (!base64) continue;

        cloudinary.config({ 
          cloud_name: 'paperapp5478248', 
          api_key: '942336965891197', 
          api_secret: 'mKxFoWwgXq2WyCtkLomqrY0jxh0' 
        });

        let filename = "./uploads/media" + Date.now() + Math.random();
        if (!dataURLtoFile(base64, filename)) filename = base64;
        // console.log(file);
        const cloudinaryUpload = await cloudinary.v2.uploader.upload(filename);
          
        const url = cloudinaryUpload.url;
        newImgTag = imgTag.replace(base64, url);
        newContent = content.replace(imgTag, newImgTag);
        if (thumbnail === "") thumbnail = url;
        // console.log(url);
        // if (cloudinaryUpload.url) fs.unlinkSync(filename);
      }

      // console.log(newContent);
      if (thumbnail === "") thumbnail = "./uploads/no-thumbnail.jpg";
      const news = new News({
        id,
        title,
        keywords,
        content: newContent,
        thumbnail
      });

      const savedNews = await news.save();
      // console.log(savedNews);

      res.status(200).json({
        success: true,
        message: `News has been added successfully!`,
        news: savedNews
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch news api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      let news = [];

      const query = [
        { $sort : { "created" : -1 }},
      ];
      
      news = await News.aggregate(query);

      res.status(200).json({
        news
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch news api
router.get(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const newsId = req.params.id;

      let newsDoc = null;

      newsDoc = await News.findOne({ _id: newsId })

      if (!newsDoc) {
        return res.status(404).json({
          message: 'No news found.'
        });
      }

      res.status(200).json({
        news: newsDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const newsId = req.params.id;
      const update = req.body.news;
      const query = { _id: newsId };

      await News.findOneAndUpdate(query, update, {
        new: true
      });
      
      res.status(200).json({
        success: true,
        message: 'News has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const newsId = req.params.id;
      const update = req.body.news;
      const query = { _id: newsId };

      await News.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'News has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const news = await News.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `News has been deleted successfully!`,
        news
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
