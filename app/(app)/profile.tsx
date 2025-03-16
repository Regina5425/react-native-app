import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';
import { Button } from '../../shared/Button/Button';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [libraryPermission, requestLibraryPermission] = useMediaLibraryPermissions();

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

	const verifyLibraryPermissions = async () => {
		if (libraryPermission?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermission();
			return res.granted;
		}
		if (libraryPermission?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере');
			return false;
		}
		return true;
	};

	const pickCameraAvatar = async () => {
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
		return result;
	};

	const pickImageAvatar = async () => {
		const isPermissionGranted = await verifyLibraryPermissions();

		if (!isPermissionGranted) {
			return;
		}

		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		setImage(result.assets[0].uri);
	};

	return (
		<View>
			<Text>profile</Text>
			<Button text="Снять изображение" onPress={pickCameraAvatar} />
			<Button text="Выбрать изображение" onPress={pickImageAvatar} />
			{image && (
				<Image
					source={{
						uri: image,
						width: 100,
						height: 100,
					}}
				/>
			)}
		</View>
	);
}
