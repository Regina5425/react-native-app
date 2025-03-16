import { useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from 'expo-image-picker';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import UploadIcon from '../../assets/icons/uploaad';
import { Colors, Fonts, Gaps, Radius } from '../tokens';
import FormData from 'form-data';
import axios, { AxiosError } from 'axios';
import { FILE_API } from '../api';

interface UploadResponse {
	urls: {
		original: string;
		webP: string;
	};
}

type Props = {
	onUpload: (uri: string) => void;
	onError?: (error: string) => void;
};

export function ImageUploader({ onUpload, onError }: Props) {
	const [libraryPermission, requestLibraryPermission] = useMediaLibraryPermissions();

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

	const uploadToServer = async (url: string, fileName: string) => {
		const formData = new FormData();
		formData.append('files', {
			uri: url,
			name: fileName,
			type: 'image/jpeg',
		});

		try {
			const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			onUpload(data?.urls.original);
			return data?.urls.original;
		} catch (e) {
			if (e instanceof AxiosError) {
				console.error(e);
			}
			return null;
		}
	};

	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return null;
		}
		return result.assets[0];
	};

	const upload = async () => {
		const isPermissionGranted = await verifyLibraryPermissions();

		if (!isPermissionGranted) {
			onError?.('Недостаточно прав');
			return;
		}

		const asset = await pickImage();
		if (!asset) {
			onError?.('Файл не выбран');
			return;
		}

		const uploadedUrl = await uploadToServer(asset.uri, asset.fileName ?? '');
		if (!uploadedUrl) {
			onError?.('Не удалось загрузить изображение');
			return;
		}
		onUpload(uploadedUrl);
	};

	return (
		<Pressable onPress={upload}>
			<View style={styles.wrapper}>
				<UploadIcon />
				<Text style={styles.text}>Загрузить изображение</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		gap: Gaps.g8,
		alignItems: 'center',
		backgroundColor: Colors.violetDark,
		padding: 18,
		borderRadius: Radius.r10,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f14,
		fontFamily: Fonts.regular,
	},
});
