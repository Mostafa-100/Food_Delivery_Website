import { FaApple } from "react-icons/fa";
import googlePlay from "../assets/icons/google-play.png";

function Cta() {
  return (
    <div className="py-28 bg-neutral-100">
      <div className="container mx-auto">
        <div className="grid place-items-center ">
          <div className="text-3xl font-medium text-center mb-5">
            For Better Experience Download Tomato App
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-x-1 bg-slate-950 py-2 px-4 rounded-lg text-white cursor-pointer">
              <img src={googlePlay} className="w-8" />
              <div>
                <div className="text-xs font-thin">GET IT ON</div>
                <div>Google Play</div>
              </div>
            </div>
            <div className="flex items-center gap-x-1 bg-slate-950 py-2 px-4 rounded-lg text-white cursor-pointer">
              <FaApple className="text-4xl" />
              <div>
                <div className="text-xs font-thin">Download on the</div>
                <div>App Store</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cta;
