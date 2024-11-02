import { useEffect } from "react";
import kakaoLoginWide from "../../assets/kakao_login_large_wide.png";
import kakaoLoginNarrow from "../../assets/kakao_login_large_narrow.png";

type Props = {};

const Login = (props: Props) => {
	const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
	const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback"; // 카카오 개발자 센터에 등록한 URI

	const handleKakaoLogin = () => {
		const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
		window.location.href = kakaoAuthUrl;
	};

	return (
		<div className="w-full h-screen bg-black flex justify-center items-center">
			<div className="w-[400px] h-[600px] bg-white rounded-md flex flex-col items-center justify-center gap-6">
				<div className="font-extrabold text-4xl mb-[100px]">
					런닝 <span className="text-primary">크루</span>
				</div>
				<span>로그인하고 크루를 만나보세요!</span>

				<img
					src={kakaoLoginWide}
					className="w-[300px] cursor-pointer hover:opacity-70"
					onClick={handleKakaoLogin}
					alt="카카오 로그인"
				/>
			</div>
		</div>
	);
};

export default Login;
