import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";




const firebase = {
    apiKey: "AIzaSyCiKzWHyjqKluxJpm2m1IJmD3h2Gzh1qcs",
    authDomain: "do-re-mi-36bf2.firebaseapp.com",
    projectId: "do-re-mi-36bf2",
    storageBucket: "do-re-mi-36bf2.appspot.com",
    messagingSenderId: "1020962769028",
    appId: "1:1020962769028:web:86189c5ab332387574dad1"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebase);  //Creates and initializes a @firebase/app#FirebaseApp instance.
  export const storage = getStorage(app);  //Gets a FirebaseStorage instance 


  export default storage;
