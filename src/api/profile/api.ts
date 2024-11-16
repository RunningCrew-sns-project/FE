import { http } from "../request";

export const getMySummary = async () => {
	const response = await http.get(`/api/account/my-summary`);
	return response;
};

export const getMyProfile = async () => {
	const response = await http.get(`/api/account/my-info`);
	return response;
};

export const updateMyProfile = async (data) => {
	const response = await http.put(`/api/account/my-info`, data);
	return response;
};
