import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/AuthContext';

import styles from '../../styles/Login.module.scss';

const Login = () => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (user && user.username) router.replace('/').catch(console.error);
  }, [user, router]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password')
        })
      }).then(async res => {
        if (res.ok) {
          setUser(await res.json());
          return router.replace('/');
        }
        const { message } = await res.json();
        setError(message);
      }).catch(console.error);
    },
    [router, setError]
  );

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styles.formContainer}>
        <img className={styles.formLogo} src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
             alt="Workflow"/>
        <h2 className={styles.formHeader}>
          Sign in to your account
        </h2>
        {error ? (
          <p className={styles.formError}>
            {error}
          </p>
        ) : (
          <p className="text-gray-300 text-sm text-center">
            Username: demo / Password: password
          </p>
        )}
        <form name="signInForm" className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" autoComplete="current-login" required
                     className={`${styles.inputGroupInput} rounded-none rounded-t-md`}
                     placeholder="Username"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required
                     className={`${styles.inputGroupInput} rounded-none rounded-b-md`}
                     placeholder="Password"/>
            </div>
          </div>

          <div>
            <button type="submit" className="button-indigo w-full">
              Sign in
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
