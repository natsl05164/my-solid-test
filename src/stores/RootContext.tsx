
import {  createContext, useContext , ParentProps,createSignal   } from "solid-js";
 
import { isServer } from "solid-js/web";  

const RootContext = createContext({} as any);

export function RootProvider(props) {
   
  //  console.log('StartProvider', isServer , props.context?.request.headers , )
  
 
    // TODO: throw error if values are used on client for anything more than stubbing
  // OR replace with actual request that updates with the current URL
  return (<RootContext.Provider value={ props } >  {props.children} </RootContext.Provider>
  );
    
  }
  
  export function useCtx() { return useContext(RootContext); }