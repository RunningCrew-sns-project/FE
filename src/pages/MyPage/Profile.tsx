import React from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../../components/Button";

type Props = {};

const Profile = (props: Props) => {
	return (
		<div className="flex flex-col w-full h-screen px-4">
			<div className="border-b py-4 ">
				<div className="w-[800px] mx-auto flex items-center justify-between">
					<h1 className="font-bold text-xl">내 정보</h1>
					<Button theme="dark">저장</Button>
				</div>
			</div>
			<form className="flex flex-col w-[800px] mx-auto py-6">
				<div className="w-[100px] h-[100px] rounded-full bg-blue-200 relative mb-6 cursor-pointer">
					<img src="profile-pic-url" alt="Profile" />
					<FaEdit
						style={{
							position: "absolute",
							right: 0,
							bottom: 0,
							width: "30px",
							height: "30px",
						}}
					/>
				</div>
				<label className="text-gray-500 mb-2">닉네임</label>
				<input
					type="text"
					placeholder="Nickname"
					className="p-2 border rounded"
				/>
				<label className="text-gray-500 mt-4 mb-2">휴대폰번호</label>
				<input type="tel" placeholder="Phone" className="p-2 border rounded" />
				<label className="text-gray-500 mt-4 mb-2">이메일</label>
				<input
					type="email"
					placeholder="Email"
					className="p-2 border rounded"
				/>
			</form>
		</div>
	);
};

export default Profile;
