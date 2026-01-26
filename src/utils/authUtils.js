import {
    getAuth,
    signInWithEmailAndPassword,
    signInAnonymously,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import app from '../firebase';

const auth = getAuth(app);

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

export const loginAnonymously = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export { auth };
