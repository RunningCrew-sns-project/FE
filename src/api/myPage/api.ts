import { http } from "../request";

export const getMyCrew = async () => {
	const response = await http.get(`/api/account/my-crew`);
	return response;
};

export const getMyRunning = async () => {
	const response = await http.get(`/api/account/my-info`);
	return response;
};
