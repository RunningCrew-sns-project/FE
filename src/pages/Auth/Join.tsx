import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { socialJoin } from "../../api/auth/api";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

const Join = (props: Props) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { email, nickname, profileImg, provider, socialId } = state;
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleJoin = async () => {
		try {
			const response = await socialJoin({
				email,
				nickname,
				provider,
				socialId,
				profileImg,
				phoneNumber,
			});
			if (response.status === 201) {
				toast("성공적으로 회원가입이 되었습니다! 로그인해주세요!");
				setTimeout(() => {
					navigate("/login");
				}, 1000);
			} else toast("error");
		} catch (error) {
			toast("error");
		}
	};
	return (
		<div className="w-full h-screen bg-black flex justify-center items-center">
			<form className="w-[400px] h-[600px] bg-white rounded-md flex flex-col items-center justify-center gap-6">
				<h1 className="text-lg">프로필을 완성해주세요!</h1>
				<img src={profileImg} className="w-[100px]" />
				<input
					type="text"
					name="nickname"
					required
					placeholder="닉네임"
					value={nickname}
					className="p-2 border rounded text-gray-400"
					disabled
				/>
				<input
					type="email"
					name="email"
					required
					value={email}
					className="p-2 border rounded text-gray-400"
					disabled
				/>
				<input
					type="tel"
					name="phone"
					required
					className="p-2 border rounded"
					placeholder="휴대폰번호"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>

				{/* <select name="gender" required>
					<option value="">선택하세요</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select> */}

				{/* <input type="month" name="birthdate" required /> */}

				<Button theme="primary" onClick={handleJoin}>
					가입하기!
				</Button>
			</form>
			<Toaster />
		</div>
	);
};

export default Join;
