
import {  createContext, useContext , ParentProps,createSignal,createMemo, createEffect   } from "solid-js";
import type{  Accessor,Setter  } from "solid-js";
  
import { getPageResource     } from "../resources/PageResource";
const PgDataContext = createContext([] as any);

export function PgDataProvider( props :ParentProps ) {
  const [data, {mutate, refetch}] = getPageResource(); 
   const pgData = data;
    
    createEffect(()=>{   console.log('PgDataProvider  ',pgData  );})

  
    
  return (<PgDataContext.Provider value={ [pgData , {mutate, refetch} ] } >
      {props.children}
    </PgDataContext.Provider>
  );
    
  }
  
  export function usePgData() { return useContext(PgDataContext); }