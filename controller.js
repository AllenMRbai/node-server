const path=require('path');
const fs=require('mz/fs');

function addMapping(controller,router){
	for(let m in controller){
		if(m.startsWith('GET')){
			let view=m.substring(4);
			router.get(view,controller[m]);
		}else if(m startsWith('POST')){
			let view=m.substring(5);
			router.post(view,controller[m]);
		}else{
			console.log(`this is not a valid URL ${m}`);
		}
	}
}

function getControllers(dir,router){
	let cpath=fs.join(__dirname,dir),
		files=fs.readdirSync(cpath),
		js_files=files.filter((f)=>{
			return f.endsWidth('.js');
		});
		for(let f of js_files){
			let mpath=fs.join(cpath,f);
			let controller=require(mpath);
			addMapping(controller,router);
		}
}

module.exports=function(controllers){
	let controllers_dir=controllers || 'controllers',
	router=require('koa-router');
	getControllers(controllers_dir,router);
	return router.routes();
}