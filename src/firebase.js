import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBWzRuvF9Qe1vWeRYD_nYM08EaiZ0pW4eM",
  authDomain: "tomato-30cb2.firebaseapp.com",
  projectId: "tomato-30cb2",
  storageBucket: "tomato-30cb2.appspot.com",
  messagingSenderId: "728777714433",
  appId: "1:728777714433:web:4d4ff27102050185cb4900",
  measurementId: "G-18NYT8ZTDH",
});

export const auth = app.auth();
const db = app.firestore();
export default app;
export { db };
