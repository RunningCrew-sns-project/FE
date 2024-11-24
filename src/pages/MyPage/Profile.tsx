import { useEffect, useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../../components/Button";
import { getMyProfile, updateMyProfile } from "../../api/profile/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../../api/image/api";

interface MyInfo {
	email: string;
	nickname: string;
	phoneNumber: string;
	gender: string;
	dateOfBirth: string | null;
	profileImg: string;
	lastLogin: string;
	status: string;
	roles: string[]; // 빈 배열 대신 string[] 타입 지정
}

const Profile = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [profileData, setProfileData] = useState<MyInfo>({
		email: "",
		nickname: "",
		phoneNumber: "",
		gender: "",
		dateOfBirth: null,
		profileImg: "",
		lastLogin: "",
		status: "",
		roles: [],
	});
	const [nickname, setNickName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [profileImage, setProfileImage] = useState<FormData | null>(null); // FormData 타입 명시
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const getProfile = async () => {
		try {
			const res = await getMyProfile();
			setProfileData(res.data.success.responseData);
			setNickName(res.data.success.responseData.nickname);
			setPhoneNumber(res.data.success.responseData.phoneNumber);
			setPreviewUrl(res.data.success.responseData.profileImg);
		} catch (error) {
			console.error("Profile fetch error:", error);
			toast.error("프로필 정보를 불러오는데 실패했습니다.");
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const changeProfileImg = () => {
		fileInputRef.current?.click();
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// 파일 크기 체크 (5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("이미지 크기는 5MB 이하여야 합니다.");
				return;
			}

			// 이미지 파일 타입 체크
			if (!file.type.startsWith("image/")) {
				toast.error("이미지 파일만 업로드 가능합니다.");
				return;
			}

			const formData = new FormData();
			formData.append("files", file);

			setProfileImage(formData);
			const imageUrl = URL.createObjectURL(file);
			setPreviewUrl(imageUrl);
		}
	};

	const handleUpdate = async () => {
		try {
			let imgUrl: string[] | null = null;
			if (profileImage) {
				imgUrl = await uploadFiles(
					"https://runlink.kro.kr/api/storage",
					profileImage,
					{ directory: "profile_images", big: false },
				);
			}

			const res = await updateMyProfile({
				...profileData,
				nickname,
				phoneNumber,
				profileImg: imgUrl ? imgUrl[0] : profileData.profileImg,
			});

			if (res.status === 200) {
				toast.success("저장되었습니다.");
				navigate(-1);
			}
		} catch (error) {
			toast.error("프로필 업데이트 중 오류가 발생했습니다.");
			console.error("Profile update error:", error);
		}
	};

	useEffect(() => {
		return () => {
			if (previewUrl && previewUrl.startsWith("blob:")) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	return (
		<div className="flex flex-col w-full h-screen px-4">
			<div className="border-b py-4">
				<div className="w-full laptop:w-[700px] mx-auto flex items-center justify-between">
					<h1 className="font-bold text-xl">내 정보</h1>
					<Button theme="dark" onClick={handleUpdate}>
						저장
					</Button>
				</div>
			</div>
			<form className="flex flex-col w-full laptop:w-[700px] mx-auto py-6">
				<div
					className="w-[100px] h-[100px] rounded-full bg-blue-200 relative mb-6 cursor-pointer"
					onClick={changeProfileImg}
				>
					<img
						src={previewUrl || "/default-profile.png"} // 기본 이미지 추가
						alt="Profile"
						className="w-full h-full object-cover rounded-full"
					/>
					<FaEdit className="absolute right-0 bottom-0 w-[30px] h-[30px] p-1" />
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						accept="image/*"
						onChange={handleImageChange}
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
					type="tel"
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
