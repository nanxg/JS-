const express = require('express');
const router = express.Router();

router.get('/noloading',(req,res)=>{
    setTimeout(()=>{
        res.json({code:0});
    },3000)
})

module.exports = router;//导出路由