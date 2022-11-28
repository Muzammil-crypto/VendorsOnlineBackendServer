import { createContext, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { AuthAPI } from '../api';
import { io } from 'socket.io-client';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [socket, setSocket] = useState(null);

	function checkUserData() {
		const userData = JSON.parse(localStorage.getItem('user')) || null;

		if (userData?._id) {
			setUser(userData);
			setIsLoggedIn(true);

			if (!socket) {
				const socket = io('http://localhost:8080', {
					query: {
						user: localStorage.getItem('user'),
					},
				});

				setSocket(socket);
			}
		} else {
			localStorage.removeItem('user');
			setUser(null);
			setIsLoggedIn(false);
		}

		return Boolean(userData);
	}

	useEffect(() => {
		checkUserData();
	}, []);

	const { mutate: loginMutation, isLoading: isLoginLoading } = useMutation(
		AuthAPI.login,
		{
			onSuccess: (data) => {
				localStorage.setItem('user', JSON.stringify(data.user));
				checkUserData();
			},
		}
	);
	const login = async ({ email, password }, onSuccess) => {
		loginMutation(
			{ email, password },
			{
				onSuccess: () => {
					if (onSuccess) {
						onSuccess();
					}
				},
			}
		);
	};

	const { mutate: logout } = useMutation(AuthAPI.logout, {
		onSuccess: () => {
			localStorage.removeItem('user');
			checkUserData();
			socket.disconnect();
		},
	});

	return (
		<LoginContext.Provider
			value={{
				isLoginLoading,
				login,
				isLoggedIn,
				logout,
				recheck: checkUserData,
				user,
				socket,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
export default LoginProvider;
