import { useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from 'expo-image-picker';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import UploadIcon from '../../assets/icons/uploaad';
import { Colors, Fonts, Gaps, Radius } from '../tokens';

type Props = {
	onUpload: (uri: string) => void;
};

export function ImageUploader({ onUpload }: Props) {
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

	const pickImage = async () => {
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
		onUpload(result.assets[0].uri);
	};

	return (
		<Pressable onPress={pickImage}>
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
