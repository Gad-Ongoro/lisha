import { ImSearch } from "react-icons/im";
import { LiaInboxSolid } from "react-icons/lia";
import { FiEdit3 } from "react-icons/fi";

function NavBar() {
	return (
		<div className="hidden md:block">
			<div className='flex flex-col md:flex-row justify-center items-center md:justify-between text-center gap-3'>
				<div className="flex gap-3">
					<div className="relative">
						<img 
							className="w-10 h-10 object-cover rounded-full border-double border-4 border-green-500" 
							src="https://i.pinimg.com/474x/89/9b/4d/899b4d5eb8512004d22d906b519dcb62.jpg"
							alt="NA">
						</img>
						<FiEdit3 className="transition-all duration-300 cursor-pointer absolute left-2/3 top-2/3 hover:text-green-500" />
					</div>
					<div className="flex justify-center items-center text-center">
						<p>Gad Ongoro</p>
					</div>
				</div>
				<div>
					<div className="flex justify-center items-center text-center">
						<input className="outline-0 bg-transparent border rounded p-1" type="search" placeholder="Search here..."></input>
						<ImSearch size={17} className="transition-all duration-300 m-2 cursor-pointer hover:text-green-500"></ImSearch>
					</div>
				</div>
				<div className="flex">
					<LiaInboxSolid className="transition-all duration-300 m-2 cursor-pointer hover:text-green-500" size={25} />
					<button type="button" className="btn text-white bg-green-500 hover:bg-green-600 h-10">
  						Notifications <span className="badge text-gray-100 bg-gray-900">9+</span>
					</button>
				</div>
			</div>
		</div>
	)
};

export default NavBar;