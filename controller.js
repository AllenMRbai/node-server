const path=require('path');
const fs=require('mz/fs');

function addMapping(mapping,router){
	for(let url in mapping){
		if(url.startsWith('GET')){
			let view=url.substring(4);
			router.get(view,mapping[url]);
		}else if(url.startsWith('POST')){
			let view=url.substring(5);
			router.post(view,mapping[url]);
		}else{
			console.log(`this is not a valid URL ${url}`);
		}
	}
}

function addControllers(dir,router){
	let cPath=path.join(__dirname,dir),
		files=fs.readdirSync(cPath),
		js_files=files.filter((f)=>{
			return f.endsWith('.js');
		});
		for(let f of js_files){
			let jsPath=path.join(cPath,f);
			let mapping=require(jsPath);
			addMapping(mapping,router);
		}
}

module.exports=function(dir){
	let 
		controllers_dir=dir || 'controllers',
		router=require('koa-router')();
	addControllers(controllers_dir,router);
	return router.routes();
}