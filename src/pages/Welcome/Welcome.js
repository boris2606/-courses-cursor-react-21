import React from 'react';
import styles from './Welcome.module.scss'
import { Link } from 'react-router-dom';
import okIcon from '../../img/ok.png'

const Welcome = (props) => {
    let usersAuthTemp =localStorage.getItem('authPerson');
    let userAuth = JSON.parse(usersAuthTemp)

    // Видалення при виході автоизованого користувачв
    function deleteAuthUser(){
        localStorage.removeItem('authPerson')
    }

    return (
        <div className={styles.wrapper_welcom}>
            <img className={styles.ok_image} src={okIcon} alt='Logged'/>
            <p className={styles.welcome_txt}>Welcome you have successfully logged in </p>
            <p className={styles.auth_info}>{userAuth.firstName} {userAuth.lastName}</p>
            <p className={styles.mail_info}>{userAuth.email}</p>
            <Link className={styles.btn_log_out} to='/' onClick={deleteAuthUser}>Log out</Link>
        </div>
    );
};

export default Welcome;