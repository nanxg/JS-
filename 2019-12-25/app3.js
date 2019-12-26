// 多个文件上传

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer  = require('multer');

app.use(express.static('www')); 
app.use(multer({ dest: 'uploads/'}).array('filename')); // single为单个上传，array为多个上传

app.use(bodyParser.json());//解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));

app.use('/upload',require('./routers/upload'))

app.listen(80);