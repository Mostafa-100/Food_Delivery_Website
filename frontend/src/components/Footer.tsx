import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="px-2 md:px-0 py-16 text-white"
      style={{ backgroundColor: "#2F2C2F" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
          <div>
            <div className="text-3xl text-orange-600 font-bold">Tomato.</div>
            <div className="max-w-lg text-sm font-thin">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              iusto itaque placeat, perferendis vitae rerum voluptatem earum
              consectetur quod! Quas nulla exercitationem voluptatum facilis
              eligendi blanditiis a rem, corrupti numquam.
            </div>
            <div className="flex gap-1 mt-2">
              <div className="p-2 border border-white hover:bg-white hover:text-black cursor-pointer transition-colors rounded-full">
                <FaFacebookF />
              </div>
              <div className="p-2 border border-white hover:bg-white hover:text-black cursor-pointer transition-colors rounded-full">
                <BsTwitterX />
              </div>
              <div className="p-2 border border-white hover:bg-white hover:text-black cursor-pointer transition-colors rounded-full">
                <FaLinkedinIn />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-3">COMPANY</h3>
            <ul>
              <li>
                <a href="#" className="font-thin">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="font-thin">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="font-thin">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="font-thin">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-3">GET IN TOUCH</h3>
            <div className="font-thin">+1-212-4569-8799</div>
            <div className="font-thin">contact@tomato.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
