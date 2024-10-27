import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button";

type Props = {};

const MyPage = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="flex bg-black flex-col tablet:flex-row h-full">
			{isMenuOpen && (
				<div
					className="fixed inset-0 opacity-50 z-20"
					onClick={() => setIsMenuOpen(false)}
				></div>
			)}
			<div className="w-full h-[160px] shrink-0 fixed z-10 px-4 pt-4 tablet:w-[160px] tablet:h-screen tablet:border-r border-white/30 bg-black">
				<div className="flex items-center justify-between">
					<div className="flex items-center tablet:flex-col">
						<div className="w-[80px] h-[80px] bg-pink-100 rounded-full mr-4 tablet:mr-0 tablet:mb-4"></div>
						<h1 className="text-white">Nick name</h1>
					</div>
					<div
						className="text-white tablet:absolute tablet:left-10 tablet:bottom-10"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						setting
					</div>
					{/* 슬라이드 아웃 메뉴 */}
					<div
						className={`fixed top-0 right-0 w-64 h-full bg-white transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
					>
						<div className="flex flex-col px-4 mt-[200px] gap-6">
							<Button theme="primary">회원정보수정</Button>
							<Button theme="light" className="border">
								회원탈퇴
							</Button>
							<Button theme="dark">로그아웃</Button>
						</div>
					</div>
				</div>
				<div className="flex w-full justify-between py-6 tablet:flex-col gap-4">
					<NavLink
						to="myRunning"
						className={({ isActive }) =>
							"flex justify-center items-center w-[100px] h-[30px] transition-colors rounded-full hover:opacity-80 text-md font-bold " +
							(isActive ? "bg-primary text-[#000]" : "bg-white text-[#000]")
						}
					>
						런닝
					</NavLink>
					<NavLink
						to="myCrew"
						className={({ isActive }) =>
							"flex justify-center items-center w-[100px] h-[30px] transition-colors rounded-full hover:opacity-80 text-md font-bold " +
							(isActive ? "bg-primary text-[#000]" : "bg-white text-[#000]")
						}
					>
						크루원
					</NavLink>
					<NavLink
						to="myFeed"
						className={({ isActive }) =>
							"flex justify-center items-center w-[100px] h-[30px] transition-colors rounded-full hover:opacity-80 text-md font-bold " +
							(isActive ? "bg-primary text-[#000]" : "bg-white text-[#000]")
						}
					>
						피드
					</NavLink>
				</div>
			</div>
			{/* scroll area */}
			<div className="px-4 mt-[180px] tablet:ml-[180px] tablet:mt-[80px]">
				<Outlet />
			</div>
		</div>
	);
};

export default MyPage;
