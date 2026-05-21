const express = require('express');

const router = express.Router();

// inport the controller functions
const { createBlog } = require('../controller/createBlog');
const {getBlogs} = require('../controller/getBlogs');
const { getBlogById } = require('../controller/getBlogById');
const { deleteBlogsById } = require('../controller/deleteBlogsById');
const { updateBlogById } = require('../controller/updateBlogById');
//map with route
router.get('/get-blogs', getBlogs);
router.post('/create', createBlog);
router.get('/get-blogs/:id', getBlogById);
router.delete('/delete/:id', deleteBlogsById);
router.post('/login',login);
router.post('/register',register);
// for the update we will use the put method and we will pass the id of the blog to be updated in the url and the updated data in the request body
router.put('/update/:id', updateBlogById);

module.exports = router;