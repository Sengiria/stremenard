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


export const createUserProfileDocument = async (userAuth, gochi, additionalData) => {
  if (!userAuth) return;

  console.log(gochi)

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...gochi,
        xp: 0,
        level: 1,
        hunger: 40,
        thirst: 40,
        natureCalls: 40,
        sleepiness: 40,
        boredom: 40,
        ...additionalData

      })
    } catch (error) {
      console.log(error)
    }
  }
  return userRef;
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// update gochi data

export const xpSystem = {
  1: 150,
  2: 300,
  3: 450,
  4: 600,
  5: 750,
  6: 900,
  7: 1050,
  8: 1200,
  9: 1350,
  10: 1500,
  11: 1650,
  12: 1800,
  13: 1950,
  14: 2100,
  15: 2250,
  16: 2400
}

export const updateGochi = async (userId, changedAttributes, xp, level, xpToAdd) => {
  const gochiRef = firestore.collection(`users`).doc(userId);

  const xpNeeded = xpSystem[level]
  const sum = xp + xpToAdd

  try {
    await gochiRef.update({
      ...changedAttributes,
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