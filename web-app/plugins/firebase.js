import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBJXxT3zVooZoheT3wVwQgxfsnPBT1ptH4",
  authDomain: "esd-g3t1-project.firebaseapp.com",
  projectId: "esd-g3t1-project",
  storageBucket: "esd-g3t1-project.appspot.com",
  messagingSenderId: "1014855786050",
  appId: "1:1014855786050:web:b35a17797f0b43b50c57db"
};

let app = null;
if(!firebase.getApps.length){
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase
