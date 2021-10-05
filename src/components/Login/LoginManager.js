// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from './FirebaseConfig';
import { getAuth, FacebookAuthProvider, signOut, updateProfile, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

export const initializedLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            const signInUser = {
                displayName: user.displayName,
                isLoggedIn: true,
                email: user.email,
                success: 'user created successfully',
                photoURL: user.photoURL
            }
            return signInUser;
        }).catch(error => {
        })
}

export const handleFacebookSignIn = () => {
    const fbProvider = new FacebookAuthProvider();

    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;

            const signInUser = {
                displayName: user.displayName,
                isLoggedIn: true,
                success: 'user created successfully',
                email: user.email,
                photoURL: user.photoURL
            }
            return signInUser;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log("Error fb sign in : ", errorCode, errorMessage, email, credential);
        });
}

export const handleSignOut = (signInUser) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            const signOutUser = {
                displayName: '',
                email: '',
                photoURL: '',
                isLoggedIn: false,
            }
            return signOutUser;
        }).catch((error) => {

        })
}

export const signUpEmailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUser = user;
            newUser.error = '';
            newUser.success = 'user created successfully';
            upateUserName(name);
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            return newUser;
        });
}

export const signInEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const newUser = userCredential.user;
            // const newUser = user;
            newUser.error = '';
            newUser.success = 'Logged in successfully';
            console.log(newUser.success);
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            console.log(error.message);
            return newUser;
        });
}

export const upateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        console.log("Profile Updated Successfully");
    }).catch((error) => {
        console.log(error);
    });
}

