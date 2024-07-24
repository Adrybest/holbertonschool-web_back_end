import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const res = Promise.all([signUpUser(firstName, lastName), uploadPhoto(fileName)]);
  return res.map((res) => ({
    status: res.status,
    body: res.status === 'success' ? res.value : $(`Error: ${res.value.message}`),
  }));
}
