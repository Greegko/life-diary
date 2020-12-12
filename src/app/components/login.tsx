import React from 'react';

interface LoginProps {
  login: (email: string, password: string) => void;
}

export const Login = ({ login }: LoginProps) => {
  const emailRef = React.createRef<HTMLInputElement>();
  const passRef = React.createRef<HTMLInputElement>();

  return (
    <div>
      Email: <input ref={emailRef} /><br />
      Password: <input ref={passRef} type='password' /><br />
      <button onClick={() => login(emailRef.current.value, passRef.current.value)}>Login</button>
    </div>
  )
};
