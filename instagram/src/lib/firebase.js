import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { seedDatabase } from '../seed';

const config={
  apiKey: "AIzaSyBnvCXnGkC2KFPWVUq5hO52UtPD-eL9TPU",
  authDomain: "instagram-ce69d.firebaseapp.com",
  projectId: "instagram-ce69d",
  storageBucket: "instagram-ce69d.appspot.com",
  messagingSenderId: "952609778882",
  appId: "1:952609778882:web:f553fe127cbee693ad1f5b"
};

const firebase=Firebase.initializeApp(config);
const {FieldValue}=Firebase.firestore;

//seedDatabase(firebase)

export  {firebase, FieldValue}