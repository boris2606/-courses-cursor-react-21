import React from 'react';
import styles from './Error.module.scss'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className={styles.wrapper_content}>
            <Link className={styles.sight_link} to='/'>Try again sign in</Link>
        </div>
    );
};

export default Error;