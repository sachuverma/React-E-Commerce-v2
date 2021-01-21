import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCj_0jLxs21u7YociCaYbWxAlCzHcrlshw",
  authDomain: "react-e-commerce-1596.firebaseapp.com",
  databaseURL: "https://react-e-commerce-1596-default-rtdb.firebaseio.com",
  projectId: "react-e-commerce-1596",
  storageBucket: "react-e-commerce-1596.appspot.com",
  messagingSenderId: "181340840714",
  appId: "1:181340840714:web:5cf877b463d041a08310f3",
  measurementId: "G-T3DTB67BC9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
