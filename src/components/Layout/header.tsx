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
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";

const Header = () => {
	const { isMobile, isTablet } = useDevice();
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);
	const { isLoggedIn, logout } = useAuthStore();

	const handleMovePage = (keyword: string) => {
		navigate("runlist");
		setSearchParams({ category: keyword });
		if (keyword === "/crew") {
			navigate("/crew");
		} else if (keyword === "blog") {
			navigate("/blog");
		}
		setIsOpen(false);
	};

	//모바일 메뉴 적용
	const handleMbMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
		toast("로그아웃되었습니다.");
	};

	return (
		<>
			<div className=" h-[60px] bg-primary z-[2000] pt-2.5 shadow-lg fixed top-0 left-0 right-0 bottom-0">
				<ResponsiveContainer>
					<div className="flex justify-between items-center h-full">
						<Link to={"/"}>
							<h1 className="cursor-pointer">로고</h1>
						</Link>
						<div className="">
							{isMobile || isTablet ? (
								" "
							) : (
								<ul className="flex space-x-4 items-center  ml-[180px]">
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
							)}
						</div>
						<div className="flex gap-2 items-center mr-9">
							{isLoggedIn ? (
								<Button type="button" theme="light" onClick={handleLogout}>
									로그아웃
								</Button>
							) : (
								<Link to={"/login"}>
									<Button type="button" theme="light">
										로그인
									</Button>
								</Link>
							)}
							<FaRegBell />
							<MdOutlinePersonOutline
								size={20}
								className="cursor-pointer"
								onClick={() => navigate("/myPage")}
							/>
						</div>
					</div>
				</ResponsiveContainer>
				{isOpen && (
					<div className="">
						<Mheader handleMovePage={handleMovePage} isOpen={isOpen} />
					</div>
				)}{" "}
				{(isMobile || isTablet) && (
					<div
						className="cursor-pointer fixed z-[60] right-8 top-[18px]"
						onClick={handleMbMenu}
					>
						<FontAwesomeIcon
							icon={isOpen ? faTimes : faBars}
							className="text-xl"
						/>
					</div>
				)}
				{isOpen && (
					<div className="fixed z-[40]">
						<Mheader handleMovePage={handleMovePage} isOpen={isOpen} />
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
