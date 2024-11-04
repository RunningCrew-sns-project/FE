import { http } from "../request";

export const kakaoAuth = async (data) => {
	const response = await http.post(`/api/auth/kakao`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};

export const socialJoin = async (data) => {
	const response = await http.post(`/api/auth/oauth`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};
