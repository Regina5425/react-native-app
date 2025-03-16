import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequest, LoginResponse } from './auth.interface';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';
import { atom } from 'jotai';
import { MY_ACCESS_TOKEN } from '../../../access';

export interface AuthState {
	isLoading: boolean;
	error: string | null;
	access_token: string | null;
}

export const ACCESS_TOKEN = MY_ACCESS_TOKEN;

const INITIAL_STATE: AuthState = {
	access_token: null,
	isLoading: false,
	error: null,
};

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
	async (get) => {
		return get(authAtom);
	},
	async (_get, set, { email, password }: LoginRequest) => {
		set(authAtom, {
			access_token: null,
			isLoading: true,
			error: null,
		});
		try {
			const { data } = await axios.post<LoginResponse>(API.login, {
				email,
				password,
			});
			set(authAtom, {
				access_token: data.access_token ?? ACCESS_TOKEN,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(authAtom, {
					access_token: null,
					isLoading: false,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export const logoutAtom = atom(null, (_get, set) => {
	set(authAtom, INITIAL_STATE);
});
