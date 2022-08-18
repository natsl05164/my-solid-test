
import {  createContext, useContext , ParentProps,createSignal   } from "solid-js";
import type{  Accessor,Setter  } from "solid-js";
 
import { isServer } from "solid-js/web"; 
import{ISession} from "../types/ISession";
import { createStore } from "solid-js/store";
import type{ Store ,SetStoreFunction} from "solid-js/store";
const SessionContext = createContext<[Store<ISession>, SetStoreFunction<ISession>]>(  [] as any);

export function SessionProvider(props: ParentProps<{ session?: ISession }>) {
  // const [getUserSid, setUserSid] = createSignal(props.session?.userSid || "");
  
  //window._session is for the client side hydration
  // if(!isServer && window._session){
  //   window._session.isSSRLoad= false;
  // }
  
  const [session, setSession] = createStore( props.session|| window._session );
  console.log('SessionProvider', isServer ,session );
  // console.log('SessionProvider', isServer , _session );
    // TODO: throw error if values are used on client for anything more than stubbing
  // OR replace with actual request that updates with the current URL
  return (<SessionContext.Provider value={ [session, setSession] } >
      {props.children}
    </SessionContext.Provider>
  );
    
  }
  
  export function useSession() { return useContext(SessionContext); }