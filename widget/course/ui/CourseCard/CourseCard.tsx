import { StyleSheet, Image, Text, View, Linking } from 'react-native';
import { StudentCourseDescription } from '../../../../entities/course/model/course.model';
import { Chip } from '../../../../shared/Chip/Chip';
import { Button } from '../../../../shared/Button/Button';
import { Colors, Fonts, Gaps, Radius } from '../../../../shared/tokens';
import { CourseProgress } from '../../../../entities/course/ui/CourseProgress/CourseProgress';

export function CourseCard({ image, shortTitle, courseOnDirection, alias }: StudentCourseDescription) {
	return (
		<View style={styles.card}>
			<Image source={{ uri: image, height: 200 }} style={styles.image} />
			<View style={styles.header}>
				<CourseProgress passed={40} total={120} />
				<Text style={styles.title}>{shortTitle}</Text>
				<View style={styles.chips}>{courseOnDirection.length > 0 && courseOnDirection.map((c, i) => <Chip key={i} text={c.direction.name} />)}</View>
			</View>
			<View style={styles.footer}>
				<Button text="Купить" onPress={() => Linking.openURL(`https://purpleschool.ru/course/${alias}`)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		borderRadius: Radius.r10,
		backgroundColor: Colors.blackLight,
	},
	image: {
		borderRadius: Radius.r10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		fontSize: Fonts.f20,
		color: Colors.white,
		fontFamily: Fonts.semiBold,
		marginBottom: 12,
	},
	chips: {
		flexDirection: 'row',
		gap: Gaps.g8,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 18,
	},
	footer: {
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderBottomLeftRadius: Radius.r10,
		borderBottomRightRadius: Radius.r10,
	},
});
