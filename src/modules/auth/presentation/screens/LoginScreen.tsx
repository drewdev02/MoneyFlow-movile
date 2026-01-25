import React from 'react';
import { observer } from 'mobx-react-lite';
import { Login } from '../components/LoginCompound';

export const LoginScreen = observer(() => {
  return (
    <Login>
      <Login.Logo />
      <Login.Title />
      <Login.Form>
        <Login.EmailInput />
        <Login.PasswordInput />
        <Login.Error />
        <Login.SubmitButton />
      </Login.Form>
      <Login.Links />
      <Login.Divider />
      <Login.GoogleLoginButton />
      <Login.Footer />
    </Login>
  );
});
