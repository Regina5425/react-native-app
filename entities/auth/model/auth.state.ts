import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequest, LoginResponse } from './auth.interface';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';
import { atom } from 'jotai';

export interface AuthState {
	isLoading: boolean;
	error: string | null;
	access_token: string | null;
}

const INITIAL_STATE: AuthState = {
	access_token: null,
	isLoading: false,
	error: null,
};

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
	(get) => get(authAtom),
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
				access_token: data.access_token,
				// access_token:
				// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2lhQHB1cGtpbi5ydSIsImlkIjoxNDk4LCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTc0MjA1Njk4MH0.U88AoNZex_HiDHY4fCXdoNc7b0BKZriUajrG61njIx0',
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
