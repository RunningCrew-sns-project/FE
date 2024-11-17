import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../../components/Button";
import { getMyProfile, updateMyProfile } from "../../api/profile/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface MyInfo {
	email: string;
	nickname: string;
	phoneNumber: string;
	gender: string;
	dateOfBirth: null | string;
	profileImg: string;
	lastLogin: string;
	status: string;
	roles: [];
}
const Profile = () => {
	const navigate = useNavigate();
	const [profileData, setProfileData] = useState<MyInfo>({
		email: "",
		nickname: "",
		phoneNumber: "",
		gender: "",
		dateOfBirth: "",
		profileImg: "",
		lastLogin: "",
		status: "",
		roles: [],
	});
	const [nickname, setNickName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const getProfile = async () => {
		const res = await getMyProfile();
		setProfileData(res.data.success.responseData);
		setNickName(res.data.success.responseData.nickname);
		setPhoneNumber(res.data.success.responseData.phoneNumber);
	};

	useEffect(() => {
		getProfile();
	}, []);

	const handleUpdate = async () => {
		const res = await updateMyProfile({
			...profileData,
			nickname,
			phoneNumber,
		});
		if (res.status === 200) {
			toast("저장되었습니다.");
			navigate(-1);
		}
	};
	return (
		<div className="flex flex-col w-full h-screen px-4">
			<div className="border-b py-4 ">
				<div className="w-full laptop:w-[700px] mx-auto flex items-center justify-between">
					<h1 className="font-bold text-xl">내 정보</h1>
					<Button theme="dark" onClick={handleUpdate}>
						저장
					</Button>
				</div>
			</div>
			<form className="flex flex-col w-full laptop:w-[700px] mx-auto py-6">
				<div className="w-[100px] h-[100px] rounded-full bg-blue-200 relative mb-6 cursor-pointer">
					<img src={profileData.profileImg} alt="Profile" />
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
					value={nickname}
					maxLength={8}
					onChange={(e) => setNickName(e.target.value)}
				/>
				<label className="text-gray-500 mt-4 mb-2">휴대폰번호</label>
				<input
					type="number"
					placeholder="Phone"
					className="p-2 border rounded"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<label className="text-gray-500 mt-4 mb-2">이메일</label>
				<input
					type="email"
					placeholder="Email"
					className="p-2 border rounded text-gray-400"
					value={profileData.email}
					disabled
				/>
				<span className="text-gray-400 mt-8">
					마지막 로그인: {profileData.lastLogin}
				</span>
			</form>
		</div>
	);
};

export default Profile;
