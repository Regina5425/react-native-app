import { ScrollView, StyleSheet } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { CourseCard } from '../../entities/course/ui/CourseCard/CourseCard';
import { Gaps } from '../../shared/tokens';

export default function MyCourses() {
	const { courses, isLoading, error } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	return <ScrollView style={styles.course}>{courses.length > 0 && courses.map((course) => <CourseCard key={course.id} {...course} />)}</ScrollView>;
}

const styles = StyleSheet.create({
	course: {
		flexDirection: 'column',
		gap: Gaps.g20,
		padding: 20,
	},
});
