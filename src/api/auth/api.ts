import { http } from "../request";

export const kakaoAuth = async (data: {}) => {
	const response = await http.post(`/api/auth/kakao`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};

export const socialJoin = async (data: {}) => {
	const response = await http.post(`/api/auth/oauth`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};
//토큰 재발급
export const getRefreshToken = async (data: {}) => {
	const response = await http.post(`/api/auth/refresh`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};



//일반로그인 
export const login = async (data: {}) => {
	const res = await http.post(`/api/auth/login`, data,{
		headers: {
			"Content-Type": "application/json",
		},
	})
	return res
}