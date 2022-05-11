import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const passworReducer = (prevState, action) => {
  if ((action.type === "INPUT_PASSWORD")) {
    return {
      password: action.passwordValue,
      passwordIsValid: action.passwordValue.trim().length > 6,
    }
  }
  if (action.type === "PASSWORD_BLUR") {
    return {
      password: prevState.password,
      passwordIsValid: prevState.password.trim().length > 6,
    }
  }
  return {
    password: '',
    passwordIsValid: false,
  }
}

const emailReducer = (prevState, action) => {
  if ((action.type === 'INPUT_EMAIL')) {
    return {
      email: action.emailValue,
      emailIsValid: action.emailValue.includes('@'),
    }
  }
  if ((action.type === 'EMAIL_BLUR')) {
    return {
      email: prevState.email,
      emailIsValid: prevState.email.includes('@'),
    }
  }
  return {
    email: "",
    emailIsValid: false,
  }
}


const Login = (props) => {


  const [passwordState, dispatchPassword] = useReducer(passworReducer, {
    password: "",
    passwordIsValid: "",
  })

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    email: "",
    emailIsValid: "",
  })


  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        emailState.email.includes('@') && passwordState.password.trim().length > 6
      );
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  }, [emailState.email, passwordState.password])

  const emailChangeHandler = (event) => {

    dispatchEmail({
      type: "INPUT_EMAIL", emailValue: event.target.value
    })

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_PASSWORD", passwordValue: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" })

  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.email, passwordState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
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
