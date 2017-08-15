//node模块
const fs=require('fs');
const path=require('path');

//vendor模块
const Koa=require('koa');
const bodyParser=require('koa-bodyparser');

//我的模块
const router=require('./controller');//路由管理
const templating=require('./templating');//nunjucks模板渲染

const isProduction=process.env.NODE_ENV==='production';//获得当前设备是否是生产环境

const app=new Koa();

//给context绑定render方法
templating('views',{
	noCache:true,
	watch:true
});

//注册bodyParser,用以后面对ctx.request.body的解析
app.use(bodyParser());

//监测客户的请求的内容的响应时间
app.use(async (ctx,next)=>{
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	let
		startTime=new Date().getTime(),
		execTime;
	await next();
	execTime=new Date().getTime()-startTime;
	ctx.response.set('X-response-time',`${execTime}ms`);
});

//静态文件管理(因为项目上线时的静态文件是部署在反向代理服务器内，如Ngix，所以需要判断当前运行环境)
if(!isProduction){
	const staticFiles=require('./static-files');//静态文件管理
	app.use(staticFiles('/assets/',__dirname+'/assets'));
}

//添加路由
app.use(router());

//监听3000端口
app.listen(3000);

console.log('server is ready and listening at port 3000!');
