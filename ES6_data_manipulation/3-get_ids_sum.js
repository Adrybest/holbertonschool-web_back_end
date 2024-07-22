export default function getStudentsIdsSum(studentids) {
  return studentids.reduce((sum, studentids) => sum + studentids.id, 0);
}
