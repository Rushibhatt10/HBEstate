import { useState, useEffect } from 'react';
import { addDocument, getDocuments, updateDocument, deleteDocument } from '../utils/firestoreUtils';

/**
 * Example component demonstrating Firebase Firestore usage
 * This is a simple CRUD example that you can use as a reference
 */
function FirebaseExample() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch items from Firestore
    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await getDocuments('items', {
                orderBy: { field: 'createdAt', direction: 'desc' }
            });
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
            alert('Error fetching items. Make sure Firebase is configured correctly.');
        } finally {
            setLoading(false);
        }
    };

    // Add a new item
    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItemName.trim()) return;

        try {
            setLoading(true);
            await addDocument('items', { name: newItemName });
            setNewItemName('');
            await fetchItems();
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Error adding item. Make sure Firebase is configured correctly.');
        } finally {
            setLoading(false);
        }
    };

    // Delete an item
    const handleDeleteItem = async (id) => {
        try {
            setLoading(true);
            await deleteDocument('items', id);
            await fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item.');
        } finally {
            setLoading(false);
        }
    };

    // Load items on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Firebase Firestore Example</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
                This is a demo component showing how to use Firebase Firestore.
                Make sure to configure your Firebase credentials in the .env file.
            </p>

            <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Enter item name"
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '300px'
                    }}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Loading...' : 'Add Item'}
                </button>
            </form>

            <div>
                <h3>Items ({items.length})</h3>
                {loading && <p>Loading...</p>}
                {!loading && items.length === 0 && (
                    <p style={{ color: '#999' }}>No items yet. Add one above!</p>
                )}
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <span>{item.name}</span>
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                disabled={loading}
                                style={{
                                    padding: '5px 15px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FirebaseExample;
