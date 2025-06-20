import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, User } from './api/userApi';
import UserForm from './components/UserForm';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            setShowConfirmDelete(null);
        } catch (err) {
            setError('Failed to delete user');
            console.error(err);
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFormSubmit = () => {
        setSelectedUser(null);
        fetchUsers();
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>User Management System</h1>
            </header>

            <main className="main-content">
                <section className="form-section">
                    <h2>{selectedUser ? 'Edit User' : 'Create New User'}</h2>
                    <UserForm
                        user={selectedUser || undefined}
                        onSubmit={handleFormSubmit}
                    />
                </section>

                <section className="users-section">
                    <div className="users-header">
                        <h2>Users List</h2>
                        <span className="user-count">{users.length} users</span>
                    </div>

                    {isLoading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading users...</p>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    {!isLoading && !error && (
                        <div className="users-grid">
                            {users.map(user => (
                                <div key={user.id} className="user-card">
                                    <div className="user-info">
                                        <h3>{user.name}</h3>
                                        <p>{user.email}</p>
                                        <small>Created: {new Date(user.createdAt).toLocaleDateString()}</small>
                                    </div>
                                    <div className="user-actions">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                        {showConfirmDelete === user.id ? (
                                            <div className="confirm-delete">
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="confirm-button"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setShowConfirmDelete(null)}
                                                    className="cancel-button"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setShowConfirmDelete(user.id)}
                                                className="delete-button"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <style>{`
                .app-container {
                    min-height: 100vh;
                    background-color: #f5f5f5;
                }

                .app-header {
                    background-color: #2196F3;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .app-header h1 {
                    margin: 0;
                    font-size: 2rem;
                }

                .main-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .form-section {
                    margin-bottom: 40px;
                }

                .users-section {
                    background: white;
                    border-radius: 12px;
                    padding: 24px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .users-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .user-count {
                    background-color: #e3f2fd;
                    color: #1976D2;
                    padding: 4px 12px;
                    border-radius: 16px;
                    font-size: 14px;
                }

                .users-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .user-card {
                    background: white;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    padding: 20px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .user-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .user-info h3 {
                    margin: 0 0 8px 0;
                    color: #333;
                }

                .user-info p {
                    margin: 0 0 8px 0;
                    color: #666;
                }

                .user-info small {
                    color: #888;
                    font-size: 12px;
                }

                .user-actions {
                    margin-top: 16px;
                    display: flex;
                    gap: 8px;
                }

                .edit-button, .delete-button, .confirm-button, .cancel-button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .edit-button {
                    background-color: #2196F3;
                    color: white;
                }

                .edit-button:hover {
                    background-color: #1976D2;
                }

                .delete-button {
                    background-color: #f44336;
                    color: white;
                }

                .delete-button:hover {
                    background-color: #d32f2f;
                }

                .confirm-button {
                    background-color: #4caf50;
                    color: white;
                }

                .confirm-button:hover {
                    background-color: #388e3c;
                }

                .cancel-button {
                    background-color: #9e9e9e;
                    color: white;
                }

                .cancel-button:hover {
                    background-color: #757575;
                }

                .confirm-delete {
                    display: flex;
                    gap: 8px;
                }

                .loading-spinner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px;
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2196F3;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .error-message {
                    background-color: #ffebee;
                    color: #d32f2f;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .main-content {
                        padding: 16px;
                    }

                    .users-grid {
                        grid-template-columns: 1fr;
                    }

                    .app-header h1 {
                        font-size: 1.5rem;
                    }

                    .user-card {
                        padding: 16px;
                    }

                    .user-actions {
                        flex-direction: column;
                    }

                    .user-actions button {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default App;