var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
  已注册过的用户名
*/
let person = [
 "penglan",
 "xiangnan",
 "shanshan",
 "tiantian",
 "刘泉",
 "nizp"
];

router.get('/', function(req, res, next) {
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.query;
  
  console.log(req);
  if(!person.includes(json.user)){
      obj.code = 1;
      obj.msg = '没有介个银!';
  }
  res.send(JSON.stringify(obj));
});

module.exports = router;
