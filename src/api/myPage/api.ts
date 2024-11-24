import { http } from "../request";

export const getMyCrew = async () => {
	const response = await http.get(`/api/account/my-crew`);
	return response;
};

export const getMyRunning = async (data?: {}) => {
	const response = await http.get(`/api/runRecords`, {
		params: data,
	});
	return response;
};

export const getMyFeed = async (data: {}) => {
	const response = await http.get(`/api/blog?isMyBlog=true`, {
		params: data,
	});
	return response;
};

export const deleteMyFeed = async (id: number | string) => {
	const response = await http.delete(`/api/blog?blogId=${id}`);
	return response;
};
