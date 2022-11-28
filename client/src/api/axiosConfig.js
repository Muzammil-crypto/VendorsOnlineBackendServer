import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
	baseURL: `http://localhost:8080/api`,
	headers: {
		'Content-Type': 'application/json',
		'cache-control': 'no-cache',
	},
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => {
		if (response.data.message) {
			toast.success(response.data.message);
		}
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('user');
		}

		if (error.response?.data?.length > 0) {
			error.response?.data.forEach((message) => toast.error(message));
		} else if (error.response?.data?.message) {
			toast.error(error.response.data.message);
		} else if (error.message) {
			toast.error(error.message);
		} else if (error.response?.data?.error) {
			toast.error(error.response.data.error);
		}

		throw error;
	}
);

export default instance;
