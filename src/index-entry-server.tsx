/* @refresh reload */
import {
  //  renderToString,
    renderToStringAsync,
    //renderToStream
  } from "solid-js/web";
  import { Router } from "@solidjs/router";
import './root.css';
import {Root} from './Root';
import {  Suspense, } from "solid-js";
import {ISession} from './types/ISession';
import {  RootProvider } from "./stores/RootContext";
import {  SessionProvider } from "./stores/SessionContext";
 
import type{Request, Response} from 'express';
// Synchronous string rendering
// const html = renderToString(() => <Root />);

// Asynchronous string rendering 
export async function  render(req: Request, res: Response) {
  
 
   let pageSession :ISession = {
    isAuth : false,
    hostUrl : req.headers["protocol"] + '://' +  req.headers["host"] ,
    agentId : req.headers["d-key"]!, 
    isSSRLoad :true,
   };
 
   console.log('path', req.url);
 // @ts-expect-error
 //sharedConfig.context.requestContext = req;
 
    const html = await renderToStringAsync(() => <RootProvider req={req} res={res}> <SessionProvider session={pageSession}><Router url={req.url}  out={res.locals.routerContext} >   
      <Suspense> <Root /></Suspense> </Router></SessionProvider></RootProvider>);
    return html;
}


// Stream rendering
// const stream = renderToStream(() => <Root />);

// // Node
// stream.pipe(res);

// // Web streams (for like Cloudflare Workers)
// const { readable, writable } = new TransformStream();
// stream.pipeTo(writable);

// render(() => <App />, document.getElementById('root') as HTMLElement);
