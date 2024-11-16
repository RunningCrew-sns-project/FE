import axios from "axios";
// import { tokenRepo } from "../../repositories/tokenRepository";
import { getRefreshToken } from "./auth/api";

const base_url =
	"http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080";

//인스턴스 생성
const instance = axios.create({
	baseURL: base_url,
	timeout: 6000,
});

// 1.요청 인터셉터 세팅
instance.interceptors.request.use(
	(config) => {
		if (!config.headers) {
			return;
		}

		// 헤더에 토큰 추가
		const auth_token = localStorage.getItem("auth_token");

		if (auth_token) {
			config.headers.Authorization = "Bearer" + " " + auth_token;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 2.응답 인터셉터 세팅
instance.interceptors.response.use(
	function (response) {
		// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 한다.
		// 응답 데이터가 있는 작업 수행

		const { data, status, config } = response;

		return response;
	},
	async function (error) {
		// 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 한다.
		// 응답 오류가 있는 작업 수행
		const { response } = error;
		if (response) {
			if (response.status === 401) {
				const originrefreshToken = localStorage.getItem("auth_refresh_token");
				const originalRequest = error.config;

				try {
					const newAccessToken = await getRefreshToken(originrefreshToken);
					console.log("config", newAccessToken);
					tokenRepo.setToken(newAccessToken.user_token);
					tokenRepo.setRefreshToken(newAccessToken.user_refreshtoken);

					originalRequest.headers.Authorization =
						"Bearer" + " " + newAccessToken.user_token;

					return instance.request(originalRequest);
				} catch (refreshError) {
					console.error("Refresh token failed", refreshError);
					window.location.replace("/login");
					return Promise.reject(refreshError);
				}
			} else if (response.status === 503) {
				// 서버 오류
			} else {
				console.log(response.data.message);
			}
			return response;
		}
		return Promise.reject(error);
	},
);
export default instance;
