import { hydrate } from "solid-js/web";
import {  Suspense ,ErrorBoundary} from "solid-js";
/* @refresh reload */
// import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import './root.css';
import {Root} from './root';
import {  RootProvider } from "./stores/RootContext";
import {  SessionProvider } from "./stores/SessionContext";
// entry point for browser
hydrate(() => <RootProvider><SessionProvider> <Router> <Suspense> <Root /></Suspense></Router> </SessionProvider></RootProvider>, document);