import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/AuthContext';

import styles from '../../styles/Layout.module.scss';

function Layout({ title, children }) {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  const [menu, setMenu] = useState(false);

  const openMenu = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenu(true);
    },
    [setMenu]
  );
  const signOut = useCallback(
    (event) => {
      event.preventDefault();
      fetch('/api/logout', {
        method: 'POST'
      }).then(async res => {
        console.log('-> signOut', res);
        if (res.ok) {
          setUser(null);
          return router.replace('/login');
        }
        console.warn(await res.text());
      }).catch(console.error);

    },
    [setMenu]
  );

  useEffect(() => {
    const close = () => setMenu(false);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close);
    };
  }, [setMenu]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="bg-gray-100 shadow border-gray-200 sm:fixed sm:top-0 sm:left-0 sm:right-0">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between flex-wrap sm:flex-nowrap h-28 sm:h-16">
          <div className="flex-shrink-0 order-1 flex items-center h-16 mr-8">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                 alt="Workflow"/>
          </div>
          <div className={styles.headerMenu}>
            <a href="/posts"
               className={[styles.headerMenuItem, router.route.startsWith('/posts') ? styles.active : ''].join(
                 ' ')}>Posts</a>

            <a href="/users"
               className={[styles.headerMenuItem, router.route.startsWith('/users') ? styles.active : ''].join(
                 ' ')}>Users</a>
          </div>
          <div className="order-2 sm:order-3 flex items-center h-16 ml-8">
            <div className="relative">
              <button onClick={openMenu}
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none border border-gray-100 focus:border-indigo-700 hover:border-indigo-700"
                      id="user-menu" aria-haspopup="true">
                <img className="h-8 w-8 rounded-full"
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt=""/>
              </button>
              {menu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b font-medium" role="menuitem">
                    {user.name}
                  </div>

                  <button className="flex w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem" onClick={signOut}>Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:h-screen sm:pt-16">
        <div className="py-6">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
