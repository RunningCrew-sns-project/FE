import axios from "axios";
import {
	AxiosInstance,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";
import toast from "react-hot-toast";

const BASE_PATH =
	"http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080";

const Instance = () => {
	const auth_token = localStorage.getItem("auth_token");

	const instance: AxiosInstance = axios.create({
		baseURL: BASE_PATH,
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer" + " " + auth_token,
		},
	});

	instance.interceptors.request.use(
		function (config: AxiosRequestConfig) {
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
			if (error.status === 401 || error.status === 400) {
				toast("로그인이 필요합니다.");
				window.location.replace("/login");
			}
		},
	);
	return instance;
};

export const http = Instance();
