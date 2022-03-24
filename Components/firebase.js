import firebase from "firebase";
import storage from "@react-native-firebase/storage";
import database from "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "____________",
  authDomain: "____________.firebaseapp.com",
  projectId: "____________",
  storageBucket: "____________.appspot.com",
  messagingSenderId: "____________",
  appId: "____________",
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default app;

export const fireDB = app.firestore().collection;
