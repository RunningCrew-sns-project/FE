

import { CATEGORYS } from "../../const/category";

interface MHeaderProps {
  handleMovePage: (category: string) => void;  
  isOpen: boolean;  
}


const Mheader = ({ handleMovePage , isOpen } : MHeaderProps) => {


	return (
		<>
			<div	className={`fixed top-0 left-0  right w-full h-full bg-black ${
						isOpen ? "translate-x-0" : "translate-x-full"
					}`}>
				{/* 블랙 배경 */}
				<div
					className={`fixed top-0 left-0  right w-full h-full bg-black opacity-20 ${
						isOpen ? "translate-x-0" : "translate-x-full"
					}`}
				/>
				{/* 슬라이드 메뉴 */}
				<div
					className={`fixed top-0 right-0 w-64 h-full bg-white transition-transform duration-300 ease-in-out z-30 transform ${
						isOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="p-4 width-[50%]">
						<h5 className="text-xl font-bold">메뉴</h5>
						<ul className="flex flex-col space-y-4 mt-8">
							{CATEGORYS.map((category) => (
								<li
									key={category.keyword}
									className="cursor-pointer font-black"
									onClick={() => handleMovePage(category.keyword)}
								>
									{category.value}
								</li>
							))}
							<li
								className="cursor-pointer font-black"
								onClick={() => handleMovePage("blog")}
							>
								커뮤니티
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Mheader;
