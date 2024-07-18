import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaInboxSolid } from "react-icons/lia";
import { FiEdit3 } from "react-icons/fi";
import { DashContext } from "./DashHome";

function DashBar() {
	const { dashDrawerOpen, setDashDrawerOpen } = useContext(DashContext);
	return (
		<>
			<div className='flex justify-between items-center md:justify-between md:text-center gap-3'>
				<div className="flex gap-1 sm:gap-3">
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
				<div className="">
					<div className="flex justify-center items-center text-center">
						<div className="flex lg:flex-1">
							<span className="sr-only">GOFoods</span>
							<NavLink to={'/'} className='akaya-kanadaka-regular md:text-2xl font-bold text-emerald-600'>GOFoods</NavLink>
						</div>
					</div>
				</div>
				<div className="hidden md:flex">
					<LiaInboxSolid className="transition-all duration-300 m-2 cursor-pointer hover:text-green-500" size={25} />
					<button type="button" className="btn text-white bg-green-500 hover:bg-green-600 h-10">
  						Notifications <span className="badge text-gray-100 bg-gray-900">9+</span>
					</button>
				</div>

				<div className="md:hidden">
					<RxHamburgerMenu 
						onClick={() => setDashDrawerOpen(true)} 
						className="transition-all duration-300 cursor-pointer hover:text-green-500" 
						size={25} 
					/>
				</div>
			</div>
		</>
	)
};

export default DashBar;