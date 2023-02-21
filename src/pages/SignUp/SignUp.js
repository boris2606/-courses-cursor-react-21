import React, {useRef,useState} from 'react';
import titleIcon from '../../img/padlock.png'
import eyeIcon from '../../img/eye.png'
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss'
import { useSpring,animated } from '@react-spring/web'

const SignUp = (props) => {
    // Формування стилю анімації бібліатеки
    const springs = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 300
    })

    // Формування масиву користувачів
    let users = []

    // Формування підсказки паролю
    let passwordInput = useRef(null)
    function showPassword () {
        passwordInput.current.type = 'text'
    }
    function hidePassword (){
        passwordInput.current.type = 'password'
    }

    // Звірка чи користувачі в локалСтореджі не пусті, якщо ні розпарсити в масив
    const usersTemp = localStorage.getItem('users');
    if (usersTemp && usersTemp !== null) {
        try {
            users = JSON.parse(usersTemp);
        } catch (error) {
            console.log(error);
        }
    }

    // Стан полів
    const [firstName,setFirstName] = useState(''),
          [lastName,setLastName] = useState(''),
          [email,setEmail] = useState(''),
          [password,setPassword] = useState(''),
          [agree,setAgree] = useState(false)

    // Погодження на отримання розсилки
    function handlerAgree(){
        setAgree(!agree)
    }
    
    // Регулярні вирази
    const regularEmailCheck = /^.{3,}@.{2,}\..{2,}$/i 
    const regularPasswordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/

    // Функція звірки полів та редагування бордеру і задання значень в стан слідкування
    function handleChange(event) {
        if (event.target.id === 'firstName' && event.target.value.trim().length >= 3){
            event.target.style.border = '1px solid green'
            setFirstName(event.target.value.trim())
        } else if (event.target.id === 'lastName' && event.target.value.length >= 3){
            event.target.style.border = '1px solid green'
            setLastName(event.target.value.trim())
        } else if (event.target.id === 'emailForm' && regularEmailCheck.exec(event.target.value)){
            event.target.style.border = '1px solid green'
            setEmail(event.target.value.trim().toLowerCase())
        } else if (event.target.id === 'passwordForm' && regularPasswordCheck.exec(event.target.value)){
            event.target.style.border = '1px solid green'
            setPassword(event.target.value.trim())
        } else {
            event.target.style.border = '1px solid red'
        }
    }

    // Створення користувачв
    function createUser () {
        let userObject = {
            firstName,
            lastName,
            email,
            password
        }
        // Пушим користувача в масив користувачів
        users.push(userObject)
        // Доьавляємо в локалсторедж
        localStorage.setItem('users', JSON.stringify(users))
        // При успішному створені редірект на головну
        props.history.push('/')
        // reloadPage()
    }
    
    return (
        <animated.div className={styles.wrapper_sign_in} style={springs}>
            <div className={styles.sign_in_form}>
                <div className={styles.sign_in_image}>
                    <img src={titleIcon} alt='lock'></img>
                </div>
                    <p className={styles.sign_in_tit_text}>Sign up</p>
                <div className={styles.wrapper_form}>
                    <form className={styles.content_form}>
                        <div className={styles.personal_fields_wrapper}>
                            <input className={styles.form_field} onChange={handleChange} type='text' placeholder='First name *' id='firstName' required></input>
                            <input className={styles.form_field} onChange={handleChange} type='text' placeholder='Last name *' id='lastName' required></input>
                        </div>
                        <input className={styles.form_field} onChange={handleChange} type='email' placeholder='Email Address *' id='emailForm' required></input>
                        <div className={styles.password_wrapper}>
                            <input className={styles.form_field} ref={passwordInput} onChange={handleChange} type='password' placeholder='Password *' id='passwordForm' required></input>
                            <img className={styles.icon_eye_pass} src={eyeIcon} alt='Show password' onMouseEnter={showPassword} onMouseLeave={hidePassword}/>
                        </div>
                        <div className={styles.wrapper_check_box}>
                            <input className={styles.remembre_check} onChange={handlerAgree} type="checkbox" id="myCheckbox"/>
                            <label htmlFor="myCheckbox">I want to receive inspiration, marketing <br/> promotion and updates via email</label>
                        </div>
                        {/* Тільки якщо всі поля являються валідними тв підтвердженими буде відображення кнопки реєстрації */}
                        {firstName && firstName && email && password && agree ? <button className={styles.sign_in_btn}  onClick={createUser} >Sign up</button> : false}
                    </form>
                </div>
            </div>
            <div className={styles.helpers_block}>
                <Link className={styles.link_bottom_form} to='/'>Already have an account? Sign in</Link>
            </div>
        </animated.div>
    );
};

export default SignUp;