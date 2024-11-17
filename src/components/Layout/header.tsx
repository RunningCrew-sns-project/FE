import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORYS } from "../../const/category";
import Button from "../Button";
import { ResponsiveContainer } from "../Container";
import { FaRegBell } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useDevice } from "../../hook/usedevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Mheader from "./Mheader";

const Header = () => {
	const { isMobile, isTablet } = useDevice();
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);

	// 카테고리 이동
	const handleMovePage = (keyword: string) => {
		navigate("runlist");
		setSearchParams({ category: keyword });
		if (keyword === "/crew") {
			navigate("/crew");
		}else if (keyword === '/blog'){
			navigate('/blog')
		}
		setIsOpen(false)
	};

	//모바일 메뉴 적용
	const handleMbMenu = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<div className="h-[60px] bg-primary z-[2000] pt-2.5 shadow-lg fixed w-[100%] ">
				<ResponsiveContainer>
					<div className="flex justify-between items-center h-full">
						<Link to={"/"}>
							<h1 className="cursor-pointer">로고</h1>
						</Link>
						{isMobile || isTablet ? (
							""
						) : (
							<div className="flex justify-center items-center flex-1 ml-28">
								<ul className="flex space-x-4">
									{CATEGORYS.map((category) => (
										<li
											className="cursor-pointer font-black"
											onClick={() => handleMovePage(category.keyword)}
										>
											{category.value}
										</li>
									))}
									<li
										className="cursor-pointer font-black"
										onClick={() => navigate("/blog")}
									>
										커뮤니티
									</li>
								</ul>
							</div>
						)}
						<div className="flex space-x-4 items-center mr-6">
							<div>
								<Link to={"/login"}>
									<Button type="button" theme="light">
										로그인
									</Button>
								</Link>
							</div>
							<div className="flex space-x-4 items-center ">
								<FaRegBell />
								<MdOutlinePersonOutline
									size={20}
									className="cursor-pointer"
									onClick={() => navigate("/myPage")}
								/>
							</div>
						</div>
					</div>
				</ResponsiveContainer>
				{(isMobile || isTablet) && (
					<div
						className="cursor-pointer absolute top-0 z-40  right-8 top-[18px]"
						onClick={handleMbMenu}
					>
						<FontAwesomeIcon
							icon={isOpen ? faTimes : faBars}
							className="text-xl"
						/>
					</div>
				)}

				{isOpen && (
					<div className="">
						<Mheader handleMovePage={handleMovePage} isOpen={isOpen}/>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
