import { atom } from 'jotai';
import { authAtom } from '../../auth/model/auth.state';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';
import { CoursesTypeResponse, StudentCourseDescription } from './course.model';

export const courseAtom = atom<CourseState>({
	myCourses: [],
	courses: [],
	isLoading: false,
	error: null,
});

export const loadCourseAtom = atom(
	async (get) => {
		return get(courseAtom);
	},
	async (get, set) => {
		try {
			const { access_token } = await get(authAtom);
			set(courseAtom, {
				myCourses: [],
				isLoading: true,
				courses: [],
				error: null,
			});
			const { data } = await axios.get<CoursesTypeResponse>(API.my, {
				params: {
					studentCourse: 'my',
				},
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			set(courseAtom, {
				myCourses: data.my,
				isLoading: false,
				courses: data.other,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(courseAtom, {
					myCourses: [],
					isLoading: false,
					courses: [],
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface CourseState {
	myCourses: StudentCourseDescription[];
	courses: StudentCourseDescription[];
	isLoading: boolean;
	error: string | null;
}
