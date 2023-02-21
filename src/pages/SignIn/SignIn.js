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

    // Пошук користувача в базі по внесеним даним
    let userInBase
    if (props.usersData){
        userInBase = props.usersData.find(user => user.password === passwordValue && user.email === emailValue)
    }

    // Посилання на авторизацію
    let linkRef = useRef(null)

    // Формування кнопки підсказки паролю
    let passwordInput = useRef(null)
    function showPassword () {
        passwordInput.current.type = 'text'
    }
    function hidePassword (){
        passwordInput.current.type = 'password'
    }
    const regularEmailCheck = /^.{3,}@.{2,}\..{2,}$/i 
    const regularPasswordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/
    // Отримання значення з полів
    function handleChange(event) {
        if (event.target.id === 'emailForm' && regularEmailCheck.exec(event.target.value)){
            event.target.style.border = '1px solid green'
            setEmailValue(event.target.value)
        } else if (event.target.id === 'passwordForm' && regularPasswordCheck.exec(event.target.value)){
            event.target.style.border = '1px solid green'
            setPasswordValue(event.target.value)
        } else {
            event.target.style.border = '1px solid red'
        }
        // Заміна класів для авторизації
        if (passwordValue && emailValue){
            linkRef.current.classList.add(`${styles.sign_in_btn}`)
            linkRef.current.classList.remove(`${styles.disabled}`)
        } else {
            linkRef.current.classList.add(`${styles.disabled}`)
            linkRef.current.classList.remove(`${styles.sign_in_btn}`)
        }
    }

    // Перевірка чи зареєстрований користувач та редікт якщо зареєстрований на сторінку вітання
    function checkRegisterPerson(){
        if (userInBase){
            localStorage.setItem('authPerson', JSON.stringify(userInBase))
        }else {
            alert('Невірно вказаний email або пароль')
        }
    }

    // Звірка чи поставлена відмітка запамятати
    function handlerRemember(){
        setRememberCheck(!rememberChek)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className={styles.wrapper_sign_in}>
            <div className={styles.sign_in_form}>
                <div className={styles.sign_in_image}>
                    <img src={titleIcon} alt='lock'></img>
                </div>
                    <p className={styles.sign_in_tit_text}>Sign in</p>
                <div className={styles.wrapper_form}>
                    <form className={styles.content_form} onSubmit={handleSubmit}>
                        <input className={styles.form_field} onChange={handleChange} type='email' placeholder='Email Address *' id='emailForm' required></input>
                        <div className={styles.password_wrapper}>
                            <input className={styles.form_field} ref={passwordInput} onChange={handleChange} type='password' placeholder='Password *' id='passwordForm' required></input>
                            <img className={styles.icon_eye_pass} src={eyeIcon} alt='Show password' onMouseEnter={showPassword} onMouseLeave={hidePassword}/>
                        </div>
                        <input className={styles.remembre_check} type="checkbox" id="myCheckbox" onChange={handlerRemember}/>
                        {/* <label className={styles.label_sign_in} htmlFor="myCheckbox" >Remember me</label> */}
                        Встановлення посилання якщо користувача знайдено в системі
                        <Link className={`${styles.disabled}`} ref={linkRef} to={userInBase ? '/welcome' : '/'} onClick={checkRegisterPerson}>Sign In</Link>
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