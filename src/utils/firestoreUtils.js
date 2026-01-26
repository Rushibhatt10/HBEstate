import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {object} data - Data to add
 * @returns {Promise<string>} - ID of the created document
 */
export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
    }
};

/**
 * Get a specific document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 * @returns {Promise<object|null>} - Document data or null if not found
 */
export const getDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document: ', error);
        throw error;
    }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @param {object} options - Query options (where, orderBy, limit)
 * @returns {Promise<Array>} - Array of documents
 */
export const getDocuments = async (collectionName, options = {}) => {
    try {
        let q = collection(db, collectionName);

        // Apply query constraints if provided
        const constraints = [];
        if (options.where) {
            constraints.push(where(options.where.field, options.where.operator, options.where.value));
        }
        if (options.orderBy) {
            constraints.push(orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
        }
        if (options.limit) {
            constraints.push(limit(options.limit));
        }

        if (constraints.length > 0) {
            q = query(q, ...constraints);
        }

        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        return documents;
    } catch (error) {
        console.error('Error getting documents: ', error);
        throw error;
    }
};

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 * @param {object} data - Data to update
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, documentId, data) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

/**
 * Example usage:
 * 
 * // Add a document
 * const id = await addDocument('users', { name: 'John Doe', email: 'john@example.com' });
 * 
 * // Get a document
 * const user = await getDocument('users', id);
 * 
 * // Get all documents
 * const users = await getDocuments('users');
 * 
 * // Get documents with query
 * const activeUsers = await getDocuments('users', {
 *   where: { field: 'status', operator: '==', value: 'active' },
 *   orderBy: { field: 'createdAt', direction: 'desc' },
 *   limit: 10
 * });
 * 
 * // Update a document
 * await updateDocument('users', id, { name: 'Jane Doe' });
 * 
 * // Delete a document
 * await deleteDocument('users', id);
 */
