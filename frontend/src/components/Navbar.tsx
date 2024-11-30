import { Search } from "lucide-react"
import { ShoppingBasket } from "lucide-react"

function Navbar() {
    return (
        <nav>
            <div className="container mx-auto">
                <div className="flex justify-between py-5">
                    <h1 className="text-3xl text-orange-600 font-bold">Tomato.</h1>
                    <ul className="flex gap-x-3">
                        <li><a href="#" className="hover:underline transition-all">Home</a></li>
                        <li><a href="#" className="hover:underline transition-all">Menu</a></li>
                        <li><a href="#" className="hover:underline transition-all">Mobile App</a></li>
                        <li><a href="#" className="hover:underline transition-all">Contact As</a></li>
                    </ul>
                    <div className="flex gap-x-3">
                        <button><Search /></button>
                        <button><ShoppingBasket /></button>
                        <button className="block rounded-full bg-transparent hover:bg-indigo-100 transition-colors border border-indigo-900 text-indigo-900 px-3 py-1">Sign in</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;