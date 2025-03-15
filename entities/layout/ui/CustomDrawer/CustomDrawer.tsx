import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View, Image } from 'react-native';
import { Colors, Gaps } from '../../../../shared/tokens';
import CustomLink from '../../../../shared/CustomLink/CustomLink';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom } from '../../../auth/model/auth.state';
import { loadProfileAtom } from '../../../user/model/user.state';
import { useEffect } from 'react';
import { UserMenu } from '../../../user/ui/UserMenu/UserMenu';
import ProfileIcon from '../../../../assets/icons/menu/profile';
import CoursesIcon from '../../../../assets/icons/menu/courses';
import ClubIcon from '../../../../assets/icons/menu/club';
import { MenuItem } from '../MenuItem/MenuItem';

const MENU = [
	{
		text: 'Профиль',
		icon: <ProfileIcon />,
		path: '/profile',
	},
	{
		text: 'Курсы',
		icon: <CoursesIcon />,
		path: '/(app)',
	},
	{
		text: 'Клуб',
		icon: <ClubIcon />,
		path: '/club',
	},
];

export function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom);
	const [profile, loadProfile] = useAtom(loadProfileAtom);

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<UserMenu user={profile.profile} />
				{MENU.map((item) => (
					<MenuItem key={item.path} navigation={props.navigation} {...item} />
				))}
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
