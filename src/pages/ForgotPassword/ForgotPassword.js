import React, {useState} from 'react'
import styles from './ForgotPassword.module.scss'
import { Link } from 'react-router-dom'
import titleIcon from '../../img/padlock.png'
import { useSpring,animated } from '@react-spring/web'

const ForgotPassword = (props) => {
    // Формування стилю анімації бібліатеки
    const springs = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 300
    })

    // Слідкування за станом введення імейлу
    const [email,setEmail] = useState('')
    // Регулярний вираз для перевірки імейлу
    const regularEmailCheck = /^.{3,}@.{2,}\..{2,}$/i 
    // Знаходження співпадінь з введеною адресою та з базою користувачів і їх імейлом
    let checkRegisterPersonEmail = props.usersData.find(person => person.email === email)

    // Перевірка на валідність полля введення імейлу 
    function handlerEmail(event){
        if (regularEmailCheck.exec(event.target.value)){
            event.target.style.border = '1px solid green'
            setEmail(event.target.value)
        } else {
            event.target.style.border = '1px solid red'
        }
    }

    // Інформування та редікрект на початкову при успішній відправці імейлу
    function sendEmail(){
        alert('Check youe email adress, we send email for change password')
        props.history.push('/')
    }

    return (
        <animated.div className={styles.wrapper_forgot} style={springs}>
            <div className={styles.wrapper_img}>
                <img className={styles.forgot_image} src={titleIcon} alt='Lock'></img>
            </div>
            <p className={styles.forgot_tittle_txt}>Forgot your password?</p>
            <p className={styles.forgot_descr}>Pleace enter your email adress, we will send you email with link for change a password</p>
            <form className={styles.forgot_form}>
                {}
                <input className={styles.forgot_email} type='email' placeholder='Enter your email adress' required onChange={handlerEmail}></input>
                {/* Відображення тексту якщо киористувач з імейлом не знайдений */}
                {!checkRegisterPersonEmail ? <p className={styles.status_email}>We can't find this registered email</p> : false}
                {/* Звірка чи є імейл користувачв в базі, та чи заповнений імейл */}
                {email && checkRegisterPersonEmail ? <button className={styles.send_email_btn} onClick={sendEmail}>Send email</button> : false}
            </form>
            <Link className={styles.send_email_btn} to='/'>Return sign in</Link>
        </animated.div>
    );
};

export default ForgotPassword;