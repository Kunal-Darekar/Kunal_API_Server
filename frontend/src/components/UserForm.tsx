import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createUser, updateUser } from '../api/userApi';

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserFormProps {
    user?: User;
    onSubmit: () => void;
}

interface UserData {
    name: string;
    email: string;
    password: string;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const userData: UserData = { name, email, password };
            if (user) {
                await updateUser(user.id, userData);
            } else {
                await createUser(userData);
            }
            onSubmit();
            if (!user) {
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError('Failed to save user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password {user && '(leave empty to keep current)'}</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required={!user}
                        placeholder={user ? 'Leave empty to keep current password' : 'Enter password'}
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Processing...' : user ? 'Update User' : 'Create User'}
                </button>
            </form>

            <style>{`
                .form-container {
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #333;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e1e1e1;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #2196F3;
                }

                .form-group input:disabled {
                    background-color: #f5f5f5;
                    cursor: not-allowed;
                }

                .submit-button {
                    width: 100%;
                    padding: 14px;
                    background-color: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #1976D2;
                }

                .submit-button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .error-message {
                    background-color: #ffebee;
                    color: #d32f2f;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 14px;
                }

                @media (max-width: 600px) {
                    .form-container {
                        padding: 16px;
                        border-radius: 8px;
                    }

                    .form-group input {
                        padding: 10px;
                        font-size: 14px;
                    }

                    .submit-button {
                        padding: 12px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserForm;