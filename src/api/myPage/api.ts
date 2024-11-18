import { http } from "../request";

export const getMyCrew = async () => {
	const response = await http.get(`/api/account/my-crew`);
	return response;
};

export const getMyRunning = async () => {
	const response = await http.get(`/api/runRecords`);
	return response;
};

export const getMyFeed = async () => {
	const response = await http.get(`/api/blog?isMyBlog=true`);
	return response;
};

export const deleteMyFeed = async (id: number | string) => {
	const response = await http.delete(`/api/blog?blogId=${id}`);
	return response;
};
