import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  //  это состояние булеан по умолчаню  оно false когдо мы заполним поля и нажимаем кнопку будет true и мы переходим в Home

  useEffect(() => { // это хук код внутри него будет выполнится один раз при рендеринге если зависимость 'dependensie' будет пустой а если мы укажем туда изменяющуюся переменную то он будет выполнятся в зависимости от него 
    const storedUserLoggedInfo = localStorage.getItem('isLoggedIn') // с помощью этой константы мы получаем ключ localStorage 

    if (storedUserLoggedInfo === '1') {   // сравниваем с "1" если результат будет менять setIsLoggedIn на тру или фалс в зависимости от которого при обновлении страницы мы будем либо уже зарегистрироваными либо нет 
      setIsLoggedIn(true) // сработает если услоовие будет верно
    }
  }, []) // это 'dependensie' зависимость от которого зависит выполнене кода внутри useEffect если мы уберем его то код будет работать при каждом изменении состоянии

  const loginHandler = (email, password) => { // будет менять состояние при сробатывании этой функции на тру 
    localStorage.setItem('isLoggedIn', '1') // сохраняем состояние на localStorage что при обновлении страницы сохранилась последнее состояние пользователя
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {  // будет менять состояние при сробатывании этой функции на тру 
    localStorage.removeItem('isLoggedIn')  // очищаем  localStorage при нажатии на logout чтобы вернутся на начальное не зарегистрированное состояние 
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}   // если isLoggedIn true то показатся loginHandler
        {isLoggedIn && <Home onLogout={logoutHandler} />}   // если isLoggedIn false то показатся logoutHandler
      </main>


    </React.Fragment>
  );
}

export default App;
