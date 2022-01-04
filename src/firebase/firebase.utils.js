import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCn1zdgZxz2VaQrb0g0Qfdino7GFoX_rN0",
    authDomain: "stremenard.firebaseapp.com",
    projectId: "stremenard",
    storageBucket: "stremenard.appspot.com",
    messagingSenderId: "87209684297",
    appId: "1:87209684297:web:796efd478df2e9332cbe98",
    measurementId: "G-1PNTHF938Y"
};

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const createUserProfileDocument = async ( userAuth, additionalData ) => {
    if( !userAuth ) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
  
    if ( !snapShot.exists ) {
      const { displayName, email } = userAuth
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log(error)
      }
    }
    return userRef;
  }

// email & pass sign in

export const signInWithEmailAndPass = (email, password) => auth.signInWithEmailAndPassword(email, password)

// google sign in

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase;