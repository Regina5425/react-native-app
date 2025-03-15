import { atom } from 'jotai';
import { Profile, User } from './user.model';
import { authAtom } from '../../auth/model/auth.state';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

export const profileAtom = atom<UserState>({
	profile: null,
	isLoading: false,
	error: null,
});

export const loadProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set) => {
		const { access_token } = await get(authAtom);
		set(profileAtom, {
			profile: null,
			error: null,
			isLoading: true,
		});
		try {
			const { data } = await axios.get<Profile>(API.profile, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			set(profileAtom, {
				profile: data.profile,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(profileAtom, {
					profile: null,
					isLoading: false,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}
