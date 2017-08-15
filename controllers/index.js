 const fs=require('fs');

 var fn_loginPage=async (ctx,next)=>{
 	ctx.response.type='text/html';
 	ctx.response.body=await fs.readFile('views/login.html','utf8');
 }

 var fn_login=async (ctx,next)=>{
 	let 
 		name=ctx.request.body.name,
 		password=ctx.request.body.password;
 		ctx.response.type='text/html';
 		if(name==='Allen'&&password==='123456'){
 			ctx.render('index.html',{name:'一叶知秋'});
 		}else{
 			ctx.response.body=await fs.readFile('views/wrong.html','utf8');
 		}
 };

 module.exports={
 	'GET /login':fn_loginPage,
 	'POST /go':fn_login
 }