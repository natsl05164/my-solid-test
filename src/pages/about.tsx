import { Component, createComputed, createEffect, Suspense } from 'solid-js';
import { useRouteData } from "@solidjs/router";

import  { usePgData } from "../stores/PgDataContext";
export default function About() {

  // const name = useRouteData<() => string>();
   
  // createComputed(() => {
  //   console.log(name());
  // });


  const  [pgData , {mutate, refetch} ]= usePgData();
  console.log('about page rendered');
  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">About</h1>
      <p>{pgData()?.seo?.pageTitle}</p>
      {JSON.stringify(pgData()?.about)}
      <p class="mt-4">A page all about this website.</p>

      <p>
        <span>We love</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp; </span>
        </Suspense>
      </p>
    </section>
  );
}
