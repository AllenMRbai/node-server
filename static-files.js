const path=require('path');
const mime=require('mime');
const fs=require('mz/fs');

function staticFiles(url,dir){
	return async (ctx,next)=>{
		let rpath=ctx.request.path,
			fpath=path.join(dir,rpath.substring(url.length));
		if(rpath.startsWith(url)){
			if(await fs.exists(fpath)){
				ctx.response.body=await fs.readFile(fpath);
				ctx.response.type=mime.lookup(rpath);
			}else{
				ctx.response.status=404;
			}
		}else{
			await next();
		}
	};
}





module.exports=staticFiles;