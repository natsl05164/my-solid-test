  
 
import App from './App'; 
import type { Component,  } from 'solid-js';
import { HydrationScript } from "solid-js/web";
import { Dynamic,Assets} from "solid-js/web";
import {   onMount  ,createComputed  , ErrorBoundary,Show, useContext  } from "solid-js"; 
import { isServer } from "solid-js/web"; 
import { useSession     } from "./stores/SessionContext"; 
import {PgDataProvider,usePgData} from "./stores/PgDataContext"  
 
const _Root: Component= ( props:any)=>{
   
  const [pgData , {mutate, refetch} ] = usePgData();
  let   title = ()=>   pgData()?.seo?.pageTitle ?  pgData()?.seo.pageTitle  : pgData()?.web.PageTitle ;
  createComputed(()=>{

    console.log('data', pgData());
  
  }); 

  // store the SSR data in script to use on browser side 
  let sessionScript:string ="" ;
  if(isServer){
    const [session]= useSession();  
    sessionScript = "var _session=" +JSON.stringify(session) +";"; 
  }

  onMount( ()=>{ 
   window.preloader.stop(); 
  })

  console.log('root rendered');
  return (
    <ErrorBoundary fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}> 
  
    <html lang="en">
      <head>
        <title>{title()} </title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Show when={pgData()?.web.websiteFavicon}>
        <link rel="icon" href={pgData()?.web.websiteFavicon} type="image/gif" />
        </Show>
        <meta name="Content-Type" content="text/html" />
        <Show when={pgData()?.web.ownerVeriCode}>
        <meta name="google-site-verification" content={pgData()?.web.ownerVeriCode} />
        </Show>

        <Show when={(pgData()?.seo !=null || pgData()?.seo!= undefined)}>
            <meta name="description"  content={pgData()?.seo.metaDescription} />
            <meta name="keywords"  content={pgData()?.seo.metaKeyword} /> 
            <meta name="twitter:title"  content={pgData()?.seo.metaTitle} />
            <meta name="twitter:description"  content={pgData()?.seo.metaDescription} />
            <meta property="og:title"  content={pgData()?.seo.metaTitle} />
            <meta property="og:description"  content={pgData()?.seo.metaDescription} />
            <meta name="robots" content="INDEX, FOLLOW"/>
        </Show>
        <Show when={!(pgData()?.seo)}> 
                <meta name="twitter:title"  content={pgData()?.web.web_title}  />
               <meta property="og:title"  content={pgData()?.web.web_title} />
               <meta name="robots" content="NOINDEX, NOFOLLOW" />
        </Show>

        <meta name="twitter:card" content="summary"/>
        <meta name="og:type" content="website"/>
        <meta name="author"  content={pgData()?.web.web_title}/>
        <meta property="og:image"  content={pgData()?.web.web_logo}/>
        <meta property="og:site_name"  content={pgData()?.web.web_title}/>
        <meta name="twitter:site"  content={pgData()?.web.web_title}/>
        <meta name="twitter:image"  content={pgData()?.web.web_logo}/> 
        <meta property="og:image:alt"  content={pgData()?.web.web_title}/>
        <Show when={pgData()?.web.can_url}> 
          <meta   property="og:url"  content={pgData()?.web.can_url}/> 
          <link rel="canonical" href={pgData()?.web.can_url} />
        </Show>
     
        <HydrationScript />
        <Dynamic component="style" children=".cloak #__content {display: none }.preloader {background-color: #000;position: fixed;z-index: 9999;top: 0;bottom: 0;left: 0;right: 0;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center }.preloader svg {opacity: 0;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;width: 100%;max-width: 320px;height: auto;-webkit-animation: fadein 1.5s ease-in alternate infinite;animation: fadein 1.5s ease-in alternate infinite;-webkit-tap-highlight-color: transparent }.preloader p {font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;color: #ed1d49;margin: .5em 0 0 }.preloader-progress {position: absolute;top: 0;left: 0;transition: width .5s;height: 8px;background-color: #ed1d49;border-radius: 0 8px 8px 0 }@-webkit-keyframes fadein {from {opacity: .4 }to {opacity: 1 }}@keyframes fadein {from {opacity: .4 }to {opacity: 1 }}"></Dynamic>
         
      </head>
      <body class="cloak"> 
         <div class="preloader">
           <div class="preloader-progress" style="width:5%"></div> 
         </div> 
         <script innerHTML='var preloader={active:!0,el:document.querySelector(".preloader"),progressEl:document.querySelector(".preloader-progress"),errorEl:null,progress:1,progressTimer:null,errorTimer:null,showError:function(r,e){this.progressEl&&this.progressEl.remove(),this.errorEl||(this.errorEl=document.createElement("p"),this.el.appendChild(this.errorEl)),this.errorEl.innerHTML=r+" "+e+"s",this.errorEl.classList.remove("hidden");var s=this;clearInterval(this.errorTimer),this.errorTimer=setInterval((function(){s.errorEl.innerHTML=--e<=0?"Try to reconnect...":r+" "+e+"s",e||clearInterval(s.errorTimer)}),1e3)},start:function(){var r=this;this.progressTimer=setInterval((function(){r.progress++,r.progressEl.style.width=5*r.progress+"%",19===r.progress&&clearInterval(r.progressTimer)}),500)},stop:function(){clearInterval(this.progressTimer),document.body.classList.remove("cloak"),this.el&&this.el.remove(),this.active=!1}};preloader.start()' /> 
           <button onclick={refetch}> refetch</button>
           <div>{JSON.stringify(pgData()?.home)}</div> 
           
           <App/>  
          
          <div innerHTML='<style>my style here </style><script> console.log("custom scripts")</script><div></div>'></div>
           
          <div class="do_not_remove">Client-side-scripts</div>
          <script innerHTML={/*@once*/sessionScript}/>  
      </body>
    </html> 
  
    </ErrorBoundary>
  );
}


export function Root(props:any){

  return (

    <PgDataProvider><_Root></_Root></PgDataProvider>
  );
}