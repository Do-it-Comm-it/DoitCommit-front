import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

// 초기화
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
// google auth
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

// github auth
export const signInGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signOut = () => {
  return auth.signOut();
};
