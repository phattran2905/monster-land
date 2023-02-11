import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import code404Img from "../assets/img/404.png"

export default function Page404() {
  return (
    <div className="container-xl flex flex-row h-screen">
        <div className="basis-2/5 bg-Indigo-Blue flex flex-col items-stretch justify-between">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <img
                    src={code404Img}
                    alt="Code 404"
                />
                <p className="text-white font-bold text-center text-4xl">Page not found</p>
            </div>

            <Footer />
        </div>
        <div className="basis-3/5 bg-Flamingo-Pink bg-background-img-3 bg-no-repeat bg-cover">
        </div>
    </div>
  )
}