export default function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const gradeId = newGrades
        .findIndex((grade) => grade.studentId === student.id);
      return {
        ...student,
        grade: gradeId >= 0 ? newGrades[gradeId].grade : 'N/A',
      };
      });
}
