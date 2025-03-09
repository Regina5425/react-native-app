import { useAtom } from 'jotai';
import { Text, View } from 'react-native';
import { profileAtom } from '../../entities/user/model/user.state';
import { API } from '../../entities/auth/api/api';
import axios from 'axios';

export default function MyCourses() {
	const [profile] = useAtom(profileAtom);

	const login = async () => {
		const { data } = await axios.post(API.login, {
			email: '',
			password: '',
		});
		console.log(data);
	};

	return (
		<View>
			<Text>{profile.profile?.name}</Text>
		</View>
	);
}
