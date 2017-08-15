const path=require('path');
const mime=require('mime');
const fs=require('mz/fs');

function staticFiles(url,path){
	
	return async (ctx,next)=>{
		let rpath=ctx.request.path,
			fpath=fs.join(path,rpath.substring(url.length));
		if(rpath.startsWith(url)){
			if(await fs.exist(fpath)){
				ctx.response.body=await readFile(fpath);
				ctx.response.type=mime.lookup(fpath);
			}else{
				ctx.response.status=404;
			}
		}else{
			await next();
		}
	};
}





module.exports=staticFiles;