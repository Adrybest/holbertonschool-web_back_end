import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
    .then((results) => {
      const [photo, userName] = results;
      console.log(`${photo.body} ${userName.firstName} ${userName.lastName}`);
    })
    .catch(() => {
      console.log('Signup system offline');
    });
}
