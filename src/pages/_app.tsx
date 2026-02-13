import "@/styles/globals.css";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  // loading: () => <p className="left-1/2 top-1/2 text-md">Loading...</p>,
});

export default function App() {
  // { Component, pageProps }: AppProps
  return (
    <>
      <main className='relative h-screen w-screen'>
        <Scene />
        {/* <Component {...pageProps} />; */}
      </main>
    </>
  );
}
