import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { IoIosSettings } from "react-icons/io";
import { getMySummary } from "../../api/profile/api";

type Props = {};

const MyPage = (props: Props) => {
	const [nickName, setNickName] = useState("");
	const [profileImg, setProfileImg] = useState("");

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const handleClickEditProfile = () => {
		navigate("/profile");
	};
	const handleLogout = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("auth_refresh_token");
		navigate("/");
	};

	const requestUserSummary = async () => {
		const res = await getMySummary();
		setNickName(res.data.success.responseData.nickname);
		setProfileImg(res.data.success.responseData.profileImg);
	};

	useEffect(() => {
		requestUserSummary();
	}, []);

	return (
		<div className="flex bg-black flex-col tablet:flex-row h-full">
			{isMenuOpen && (
				<div
					className="fixed inset-0 z-20"
					onClick={() => setIsMenuOpen(false)}
				></div>
			)}
			{/* 슬라이드 아웃 메뉴 */}
			<div
				className={`fixed top-0 right-0 z-30 w-64 h-full bg-white transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex flex-col px-4 mt-[200px] gap-6">
					<Button theme="primary" onClick={handleClickEditProfile}>
						회원정보수정
					</Button>

					<Button theme="light" className="border">
						회원탈퇴
					</Button>
					<Button theme="dark" onClick={handleLogout}>
						로그아웃
					</Button>
				</div>
			</div>
			<div className="w-full h-[160px] shrink-0 fixed z-10 px-4 pt-4 tablet:w-[220px] tablet:h-screen tablet:border-r border-white/30 bg-black">
				<div className="flex items-center justify-between">
					<div className="flex items-center tablet:flex-col">
						<div className="w-[80px] h-[80px] rounded-full mr-4 tablet:mr-0 tablet:mb-4 tablet:mt-10">
							<img src={profileImg} className="object-contain rounded-full" />
						</div>
						<h1 className="text-white">{nickName}</h1>
					</div>
					<div
						className="text-white tablet:absolute tablet:left-4 tablet:bottom-20 flex items-center cursor-pointer"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<IoIosSettings
							color="white"
							style={{ width: "30px", height: "30px" }}
						/>
						<span className="hidden tablet:block">Setting</span>
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
			<div className="px-4 mt-[180px] tablet:ml-[220px] tablet:mt-[80px] w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default MyPage;
