import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBAMClIedp7o6x6U0dNAYIMNwbvgXr2CNc',
  authDomain: 'react-type-ecommerce.firebaseapp.com',
  projectId: 'react-type-ecommerce',
  storageBucket: 'react-type-ecommerce.appspot.com',
  messagingSenderId: '7712454824',
  appId: '1:7712454824:web:008f3bfc117a635dd26a9d',
};

// firebaseConfig 정보로 firebase 시작
export default firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();

export { db, storage, database, auth };
