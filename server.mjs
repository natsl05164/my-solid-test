import fs from 'node:fs'
import express from "express";
import path from "path";
import compression from "compression";
import fetch from "node-fetch";
import { createServer as createViteServer } from 'vite'
import { fileURLToPath } from 'url'
 
//import manifest from "./public/js/rmanifest.json";
const __dirname =  path.dirname(fileURLToPath(import.meta.url));
//console.log('__dirname',__dirname);
const root = process.cwd();
//console.log('root',root);
const isProd = process.env.NODE_ENV === 'production';

const port = 8082;
let vite = null;
globalThis.fetch = fetch;
const app = express();
  // console.log( 'isProd' , isProd);
  if(!isProd){
  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
      vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    }) 
    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares);
  }
  else {
  
    app.use(compression());
  
  }

  
app.get('*.*', express.static(path.join(__dirname, "./dist/public"), {
  maxAge: '1y',
  fallthrough :false
}));
 
  const indexProd = isProd
    ? fs.readFileSync(path.resolve(path.join(__dirname, './dist/public/index.html')), 'utf-8')
    : '';
    
    console.log('path' , path.join(__dirname, "./dist/public/ssr-manifest.json") );
  const manifest = isProd
    ? // @ts-ignore
    (await import(   "./dist/public/ssr-manifest.json" ,  { assert: { type: "json" } } )) 
    : {}; //this line on windows can't work --> (await import( path.join(__dirname, "./dist/public/ssr-manifest.json") )) 

  

    app.get("*",async (req, res  ) => {
    const url = req.url; //req.url
   // if (!manifest[req.url]) return res.status(404).send();
    let page;
    try {
      let template, render;
      
        if(!isProd){
          
            // always read fresh template in dev
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8' );
          // console.log('template',template );
             // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react
            template = await vite.transformIndexHtml(url, template);
 

            
             // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            render = (await vite.ssrLoadModule('./src/index-entry-server.tsx')).render;
  

        }
        else { 
              template=indexProd;
              render= (await import( "./dist/lib/index-entry-server.mjs")).render ; //not support on windows --> import( path.join(__dirname, "./dist/lib/index-entry-server.mjs") )

        }
      

        res.locals.manifest = manifest;
        res.locals.assetManifest = {};
        res.locals.routerContext = {}; 
       
         // 4. render the app HTML. This assumes entry-server.js's exported `render`
        //    function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString() 
        const appHtml = await render(req , res );
         

        //console.log('appHtml' ,appHtml);
        // if (context.url) {
        //     // Somewhere a `<Redirect>` was rendered
        //     return res.redirect(301, context.url)
        // }

        // 5. Inject the app-rendered HTML into the template.
        const html = `<!DOCTYPE html>` + appHtml.replace(`<div class="do_not_remove">Client-side-scripts</div>`, template) 
 
     
       // 6. Send the rendered HTML back.
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (err) {
        !isProd && vite.ssrFixStacktrace(err);
        console.log(err.stack);
        res.status(500).end(err.stack) 
    }   
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));