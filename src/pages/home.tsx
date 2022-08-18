import { createSignal    } from 'solid-js';
 
import  { usePgData } from "../stores/PgDataContext";
export default function Home() {

   const  [pgData , {mutate, refetch} ]= usePgData();
  const [count, setCount] = createSignal(0);
  setInterval(() => {
    setCount(count() + 1)
  }, 1000)
   
  console.log('home page rendered');
  return (
   
    <section class="bg-gray-100 text-gray-700 p-8" >
      <h1 class="text-2xl font-bold">Home </h1>
      <p class="mt-4">This is the home page test.</p>
      <p>{pgData()?.seo?.pageTitle}</p>
     {JSON.stringify(pgData()?.home)}
      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => { setCount(count() - 1);  }}
        >
          -
        </button>

        <output class="p-10px">Count: {count}</output>

        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>
      </div>
    </section>
  

  );
}
