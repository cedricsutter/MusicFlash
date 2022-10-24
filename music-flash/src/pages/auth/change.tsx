import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import PageProps from '../../interfaces/page';

const ChangePasswordPage: React.FC<PageProps> = ({ name }) => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [old, setOld] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const passwordChangeRequest = () => {
        if (password !== confirm)
        {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        auth.currentUser?.updatePassword(password)
            .then(() => {
                logging.info('Password change successful.');
                navigate(-1);
            })
            .catch(error => {
                logging.error(error);
                setChanging(false);
                setError(error.message);
            });
    }

    if (auth.currentUser?.providerData[0]?.providerId !== 'password')
        return <Link to="/">You have to log in to change your Password</Link>;

    return (
        <div>
            <form>
                <input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </form>
            <form>
                <input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </form>
            <button
                disabled={changing}
                color="success"
                onClick={() => passwordChangeRequest()}
            >
                Change Password
            </button>
            <ErrorText error={error} />
        </div>
    );
}

export default ChangePasswordPage;