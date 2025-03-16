import { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Gaps, Radius } from '../../shared/tokens';
import { ImageUploader } from '../../shared/ImageUploader/ImageUploader';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);

	return (
		<View style={styles.container}>
			{image ? (
				<Image
					source={{
						uri: image,
					}}
					style={styles.image}
				/>
			) : (
				<Image style={styles.image} source={require('../../assets/images/avatar.png')} />
			)}
			<ImageUploader onUpload={setImage} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: Gaps.g20,
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: Radius.r30,
	},
});
