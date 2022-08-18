import {useSession} from "../stores/SessionContext";
import { useLocation } from '@solidjs/router';
import { createResource  ,untrack      } from 'solid-js'; 

const fetchData  = async ( path   ) =>{
  const [session, setSession]= useSession();  
    console.log( 'fetchData',path,session)
    let fnKeys = "seo";  
    if(session.isSSRLoad){
      fnKeys += ",webSettings";
    } 
    console.log( `${session.hostUrl}/api/getData?fnKeys=${fnKeys}&curPath=${path}`)
    return (await fetch( `${session.hostUrl}/api/getData?fnKeys=${fnKeys}&curPath=${path}`)).json() ;
 }
 
 export function getPageResource( ):any  { 
    const location = useLocation();  
   // const [session, setSession]= useSession();  
  
    // const [data, { mutate, refetch }] = createResource(()=>location.pathname,  (path)=>{
    //   fetchData(path,untrack(()=>session));
    // }   );

    const [data, { mutate, refetch }] = createResource(()=>location.pathname,  fetchData  );
   
   
    return [data, { mutate, refetch }] ;
  };


  function delay<T>(t:number, v:T):Promise<T> {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
  }