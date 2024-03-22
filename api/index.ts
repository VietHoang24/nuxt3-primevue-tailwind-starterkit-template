import axios from 'axios';

export const useAxiosInstance = () => {
	const config = useRuntimeConfig();
	const refreshToken = useCookie('refresh_token');
	const accessToken = useCookie('access_token');
	const { API_BASE_URL } = config.public
	const toast = useToast();
	console.log('NUXT_API_BASE', API_BASE_URL)
	const axiosClient = axios.create({

		baseURL: API_BASE_URL as string,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true
	});

	function parseParams(params: Record<string, any>): string {
		const keys = Object.keys(params);
		let options = '';
		keys.forEach((key) => {
			const value = params[key];
			if (Array.isArray(value)) {
				// Serialize arrays as comma-separated values
				options += `${key}=${value.join(',')}&`;
			} else {
				options += `${key}=${value}&`;
			}
		});

		return options ? options.slice(0, -1) : options;
	}

	axiosClient.interceptors.request.use(
		async (config) => {
			config.headers.Authorization = `Bearer ${accessToken.value}`;

			if (config.method === 'get') {
				config.paramsSerializer = params => parseParams(params);
			}

			return config;
		},
		async (error) => {
			return Promise.reject(error);
		}
	);

	axiosClient.interceptors.response.use(
		(response) => {
			if (response === undefined) 
			return;

			return response.data;
		},
		async ({ config, error }) => {

			const originalRequest = config;
			if (
				(error.response?.status === 401 ||
					error.response.status === 461) &&
				!originalRequest._retry
			) {
				originalRequest._retry = true;
				console.log('I am refreshing');
				const configHeaders = {
					headers: {
						'Content-Type': 'application/json'
					}
				};

				try {
					const res = await axios.post(
						API_BASE_URL as string,
						{
							refresh_token: refreshToken.value
						},
						configHeaders
					);
					if (res.data.access_token) {
						accessToken.value = res?.data?.access_token;
						refreshToken.value = res?.data?.refresh_token;
						originalRequest.headers.Authorization = `Bearer ${res?.data?.access_token}`;

						return axiosClient.request(originalRequest);
					}

					toast.add({
						severity: 'error',
						summary: 'Unauthorize',
						detail: 'Please login',
						life: 3000
					});

				} catch (error) {
					toast.add({
						severity: 'error',
						summary: 'Unauthorize',
						detail: 'Please login',
						life: 3000
					});

					return error;
				}
			}

			return Promise.reject(error);
		}
	);

	return axiosClient
};






