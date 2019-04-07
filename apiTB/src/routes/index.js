var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/getData', function(req, res, next) {
  let {limit,skip} = req.query;
      mongo.find("1612","tb",function(result){
           if(!result){
              return res.send({code:0,msg:"查不到数据"})
            }else{
              let page = Math.ceil(result.length/limit)
              mongo.find("1612","tb",function(result){
                  if(!result){
                    return res.send({code:0,msg:"error"})
                  }else{
                    res.send({code:1,data:result,totalPage:page})
                  }
              },{
                limit:limit,
                skip:skip*limit
              })
                
            }
      })
}); 
router.get('/api/getSort', function(req, res, next) {
  let {sort} = req.query;
      mongo.find("1612","tb",function(result){
           if(!result){
              return res.send({code:0,msg:"查不到数据"})
            }else{
              mongo.find("1612","tb",function(result){
                  if(!result){
                    return res.send({code:0,msg:"error"})
                  }else{
                    res.send({code:1,data:result})
                  }
              },{
               sort:{pay:-1}
              })
                
            }
      })
}); 

module.exports = router;
