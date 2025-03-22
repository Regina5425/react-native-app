import { FlatList, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { CourseCard } from '../../entities/course/ui/CourseCard/CourseCard';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { Colors } from '../../shared/tokens';

export default function MyCourses() {
	const { courses, isLoading, error, myCourses } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.course}>
				<CourseCard {...item} />
			</View>
		);
	};

	return (
		<>
			{isLoading && <ActivityIndicator size={'large'} color={Colors.primary} />}
			{courses.length > 0 && (
				<FlatList
					data={courses}
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadCourses} />}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCourse}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	course: {
		padding: 20,
	},
});
