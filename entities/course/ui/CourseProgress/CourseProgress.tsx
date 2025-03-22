import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Radius } from '../../../../shared/tokens';

export function CourseProgress({ passed, total }: { total: number; passed: number }) {
	const percent = Math.round((passed / total) * 100);

	return (
		<View style={styles.wrapper}>
			<View style={styles.head}>
				<Text style={styles.percent}>{percent}%</Text>
				<Text style={styles.text}>
					{passed}/{total}
				</Text>
			</View>
			<View style={styles.bar}>
				<View style={{ ...styles.progress, width: `${percent}%` }} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 16,
	},
	head: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	percent: {
		color: Colors.primary,
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
	},
	text: {
		color: Colors.white,
		fontFamily: Fonts.regular,
		fontSize: Fonts.f14,
	},
	bar: {
		height: 5,
		borderRadius: Radius.r18,
		backgroundColor: Colors.border,
	},
	progress: {
		height: 5,
		borderRadius: Radius.r18,
		backgroundColor: Colors.primary,
	},
});
