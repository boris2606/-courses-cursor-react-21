import React, {useRef,useState} from 'react';
import styles from './SignIn.module.scss'
import titleIcon from '../../img/padlock.png'
import eyeIcon from '../../img/eye.png'
import { Link } from 'react-router-dom';

const SignIn = (props) => {

    // Стани полів
    const [emailValue,setEmailValue] = useState(''),
          [passwordValue,setPasswordValue] = useState(''),
          [rememberChek,setRememberCheck] = useState(false)
    
    // Формування кнопки підсказки паролю
    let passwordInput = useRef(null)
    function showPassword () {
        passwordInput.current.type = 'text'
    }
    function hidePassword (){
        passwordInput.current.type = 'password'
    }

    // Отримання значення з полів
    function handleChange(event) {
        if (event.target.id === 'emailForm'){
            setEmailValue(event.target.value)
        } else if (event.target.id === 'passwordForm'){
            setPasswordValue(event.target.value)
        }
    }

    // Перевірка чи зареєстрований користувач та редікт якщо зареєстрований на сторінку вітання
    function checkRegisterPerson(){
        let correctUser = props.usersData.find(user => user.password === passwordValue && user.email === emailValue)
        if (correctUser){
            localStorage.setItem('authPerson', JSON.stringify(correctUser))
            props.history.push('/welcome')
        }else {
            alert('Невірно вказаний email або пароль')
        }
    }

    // Звірка чи поставлена відмітка запамятати
    function handlerRemember(){
        setRememberCheck(!rememberChek)
    }

    return (
        <div className={styles.wrapper_sign_in}>
            <div className={styles.sign_in_form}>
                <div className={styles.sign_in_image}>
                    <img src={titleIcon} alt='lock'></img>
                </div>
                    <p className={styles.sign_in_tit_text}>Sign in</p>
                <div className={styles.wrapper_form}>
                    <form className={styles.content_form}>
                        <input className={styles.form_field} onChange={handleChange} type='email' placeholder='Email Address *' id='emailForm' required></input>
                        <div className={styles.password_wrapper}>
                            <input className={styles.form_field} ref={passwordInput} onChange={handleChange} type='password' placeholder='Password *' id='passwordForm' required></input>
                            <img className={styles.icon_eye_pass} src={eyeIcon} alt='Show password' onMouseEnter={showPassword} onMouseLeave={hidePassword}/>
                        </div>
                        <input className={styles.remembre_check} type="checkbox" id="myCheckbox" onChange={handlerRemember}/>
                        <label className={styles.label_sign_in} htmlFor="myCheckbox" >Remember me</label>
                        <button className={styles.sign_in_btn} onClick={checkRegisterPerson}>Sign in</button>
                    </form>
                </div>
            </div>
            <div className={styles.helpers_block}>
                { props.usersData ? <Link className={styles.link_bottom_form} to="/rogot-pasword">Forgot password?</Link> : <p className={styles.link_bottom_form} >Nobody registered at this site</p>}
                <Link className={styles.link_bottom_form} to='/sign-up'>Don't have an account? Sign Up</Link>
            </div>
        </div>
    );
};

export default SignIn;