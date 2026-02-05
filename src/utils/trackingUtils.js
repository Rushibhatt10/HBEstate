import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Logs a property view to the 'property_views' collection.
 * @param {Object} user - The current user object.
 * @param {string} propertyId - The ID of the property viewed.
 * @param {string} propertyTitle - The title of the property viewed.
 */
export const logPropertyView = async (user, propertyId, propertyTitle) => {
    if (!user || !propertyId) return;

    try {
        await addDoc(collection(db, 'property_views'), {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName || 'Anonymous',
            propertyId,
            propertyTitle,
            viewedAt: serverTimestamp(),
        });
        console.log('Property view logged');
    } catch (error) {
        // Silently fail if permissions are missing (happens if rules aren't deployed or user is anonymous)
        if (error.code === 'permission-denied') {
            console.warn('Property view logging skipped: insufficient permissions.');
        } else {
            console.error('Error logging property view:', error);
        }
    }
};
