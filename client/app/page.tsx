import LandingPage from "./Components/LandingPage";
import Posts from "./Posts/page";

export default function Home() {
  return (
      <div className='flex flex-col justify-center items-center p-14 max-md:p-2'>
        <LandingPage />
        <Posts />
      </div>
  )
}
