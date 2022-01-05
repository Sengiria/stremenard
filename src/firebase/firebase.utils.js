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


export const createUserProfileDocument = async ( userAuth, gochi, additionalData ) => {
    if( !userAuth ) return;

    console.log(additionalData)
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
  
    if ( !snapShot.exists ) {
      const { displayName, email } = userAuth
      const { name, type } = gochi
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          gochiName: name,
          type,
          xp: 0,
          level: 1,
          hunger: 0,
          thirst: 0,
          natureCalls: 0,
          sleepiness: 0,
          boredom: 0,
          ...additionalData
          
        })
      } catch (error) {
        console.log(error)
      }
    }
    return userRef;
  }

// update gochi data

export const xpSystem = {
  1: 150,
  2: 300,
  3: 450,
  5: 600,
  6: 750,
  7: 900,
  8: 1050,
  9: 1200,
  10: 1350
}

export const updateGochi = async (userId, name, value, xp, level, xpToAdd) => {
  const gochiRef = firestore.collection(`users`).doc(userId);

    const xpNeeded = xpSystem[level]
    const sum = xp + xpToAdd

  try {
    await gochiRef.update({
     [name]: value,
     xp: sum >= xpNeeded ? sum - xpNeeded : sum,
     level: sum >= xpNeeded ? level + 1 : level
    })
  } catch (error) {
    
  }
}

// email & pass sign in

export const signInWithEmailAndPass = (email, password) => auth.signInWithEmailAndPassword(email, password)

// google sign in

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)


// sign up

export const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password)

// sign out

export const signOut = () => auth.signOut()

export default firebase;