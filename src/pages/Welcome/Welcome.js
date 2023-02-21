import React from 'react';
import styles from './Welcome.module.scss'
import { Link } from 'react-router-dom';
import okIcon from '../../img/ok.png'

const Welcome = (props) => {

    function deleteAuthUser(){
        localStorage.removeItem('authPerson')
    }
    console.log(props);
    return (
        <div className={styles.wrapper_welcom}>
            <img className={styles.ok_image} src={okIcon} alt='Logged'/>
            <p className={styles.welcome_txt}>Welcome you have successfully logged in </p>
            <p className={styles.auth_info}>{props.userAuth.firstName} {props.userAuth.lastName}</p>
            <p className={styles.mail_info}>{props.userAuth.email}</p>
            <Link className={styles.btn_log_out} to='/' onClick={deleteAuthUser}>Log out</Link>
        </div>
    );
};

export default Welcome;