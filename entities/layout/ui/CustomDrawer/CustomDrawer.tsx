import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Gaps } from '../../../../shared/tokens';
import CustomLink from '../../../../shared/CustomLink/CustomLink';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../../auth/model/auth.state';

export function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom);

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<Text>Text</Text>
			</View>
			<View style={styles.footer}>
				<CustomLink text="Выход" onPress={() => logout()} href="/login" />
				<Image source={require('../../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	logo: {
		width: 160,
	},
	content: {
		flex: 1,
	},
	footer: {
		gap: Gaps.g50,
		alignItems: 'center',
		marginBottom: 50,
	},
});
