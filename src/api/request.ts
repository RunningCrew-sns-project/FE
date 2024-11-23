import axios from "axios";
import {
	AxiosInstance,
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from "axios";
import toast from "react-hot-toast";

const BASE_PATH = "https://runlink.kro.kr";

const Instance = (): AxiosInstance => {
	const instance: AxiosInstance = axios.create({
		baseURL: BASE_PATH,
		headers: {
			"Content-type": "application/json",
		},
	});

	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (!config.headers) {
				return config;
			}

			const auth_token = localStorage.getItem("auth_token");

			if (auth_token) {
				config.headers.Authorization = `Bearer ${auth_token}`;
			}
			return config;
		},
		(error: AxiosError) => {
			console.log(error);
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				toast("로그인이 필요합니다.");
				window.location.replace("/login");
			}
			return Promise.reject(error);
		},
	);

	return instance;
};

export const http = Instance();
