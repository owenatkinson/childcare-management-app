import firebase from "firebase";
import storage from "@react-native-firebase/storage";
import database from "firebase/database";
import "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBuR3h3vEsZC0n41jcjIYIokzoIrQaPJbg",
  authDomain: "childcaremanagementapp.firebaseapp.com",
  projectId: "childcaremanagementapp",
  storageBucket: "childcaremanagementapp.appspot.com",
  messagingSenderId: "371907641004",
  appId: "1:371907641004:web:9a5fed153fff0485c02909",
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default app;

export const fireDB = app.firestore().collection;
