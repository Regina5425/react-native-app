import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Button } from '../../shared/Button/Button';

export default function Profile() {
	const [image, setImage] = useState(null);
	const [cameraPermission, requestCameraPermission] = useCameraPermissions();

	const verifyCameraPermissions = async () => {
		if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestCameraPermission();
			return res.granted;
		}
		if (cameraPermission?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере');
			return false;
		}
		return true;
	};

	const pickAvatar = async () => {
		const isPermissionGranted = await verifyCameraPermissions();

		if (!isPermissionGranted) {
			return;
		}

		const result = await launchCameraAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		console.log(result);
	};

	return (
		<View>
			<Text>profile</Text>
			<Button text="Выбрать изображение" onPress={pickAvatar} />
		</View>
	);
}
