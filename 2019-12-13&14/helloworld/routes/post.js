var express = require('express');
var router = express.Router();


let person = [
  "penglan",
 "xiangnan",
 "shanshan",
 "tiantian",
 "刘泉",
 "nizp"
];

router.post('/', function(req, res, next) {
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.body;
  console.log(req);
  if(!person.includes(json.user)){
      obj.code = 1;
      obj.msg = '木有介个银!';
  }
  res.send(JSON.stringify(obj));
  // setTimeout(function(){
  //   res.send(JSON.stringify(obj));
  // },5000)
});

module.exports = router;
