const path=require('path');
const nunjucks=require('nunjucks')

function createEnv(dir,opts){
	let
		autoescape=opts.autoescape===undefined?true:opts.autoescape,
		noCache=opt.noCache || false,
		watch=opts.watch || false,
		throwNoUndefined=opts.throwNoUndefined || false,
		env=new nunjucks.Enviroment(
				new nunjucks.FilesSystemLoader({
					noCache:noCache,
					watch:watch
				}),{
					autoescape:autoescape,
					throwNoUndefined:throwNoUndefined
				});
	return env;
}

modules.export=function(dir,opts){
	let env=createEnv(dir,opts);
	app.context.render=function(view,model){
		return async (ctx,next)=>{
			ctx.response.body=env.render(view,Object.assign({},ctx.state || {},model || {}));
			ctx.response.type='text/html';
		};
	}
};