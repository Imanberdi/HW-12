import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');  // состояние Email  получаем и сохраняем значение этого поля в enteredEmail
  const [emailIsValid, setEmailIsValid] = useState();  // проверка на правильное заполнение Email поля
  const [enteredPassword, setEnteredPassword] = useState(''); // состояние Password получаем и сохраняем значение этого поля в enteredPassword  
  const [passwordIsValid, setPasswordIsValid] = useState(); // проверка на правильное заполнение Password поля
  const [formIsValid, setFormIsValid] = useState(false); // проверка на правильное заполнение всей формы от которого зависит будет работать кнопка или нет


  useEffect(() => {  //  здесь мы положили функцию проверки на правильное заполнение всей формы в useEffect чтобы выполняла проверку в зависимости от изменение состояние enteredEmail, enteredPassword 
    const timer = setTimeout(() => {  // функция setTimeout будет запускать функцию внутри тела через 3000 мс 
      setFormIsValid(   // функция проверки на правильное заполнение всей формы
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 3000);

    return () => {
      clearTimeout(timer) // с помощью clearTimeout будет очищаться время в setTimeout для каждого введеного символа или измененног состояние в полях ввода что позволяет не проверять множество раз 
    }
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {  // функция с помощью получаем значение Email в setEnteredEmail
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => { // функция с помощью получаем значение Password в setEnteredPassword
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {   // резкультат проверки enteredEmail на наличие @ и сохраняем на setEmailIsValid
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {   // резкультат проверки enteredPassword на наличие более 6 символов и сохраняем на setPasswordIsValid
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {  // при нажатии на кнопку сработает данная функция и запустит функцию onLogin тем самым передав ему результат состояние enteredEmail, enteredPassword где происходит подъем состояние 
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}  // передает event функции passwordChangeHandler
            onBlur={validatePasswordHandler}  // onBlur сработает при проподание фокуса с элемента тем самым запускается функция валидации
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
