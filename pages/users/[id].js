import React, { useCallback, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuthOnly } from '../../lib/AuthContext';
import withAuthOnly from '../../lib/withAuthOnly';

async function updateOrCreateUser(id, data) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id || ''}`, {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json());
}

const Users = ({ user }) => {
  useAuthOnly();
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const save = useCallback((event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const id = user ? user.id : null;
    const data = {
      ...user,
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      website: form.get('website'),
      address: {
        ...user.address,
        street: form.get('street'),
        suite: form.get('suite'),
        zipcode: form.get('zipcode'),
        city: form.get('city')
      }
    };
    setPending(true);
    updateOrCreateUser(id, data)
      .then(() => alert('User successfully saved.'))
      .catch(reason => setError(reason.message))
      .finally(() => setPending(false));
  }, [setPending, setError]);

  return (
    <Layout title="Users">
      <div className="mb-4">
        <a href="/users" className="flex-initial items-baseline px-4 py-2 hover:bg-gray-100 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"
               className="h-8 w-8 -ml-2 inline-block">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
          <span>Users</span>
        </a>
      </div>
      <form onSubmit={save}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div
            className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Personal info
          </div>
          <div className="px-4 py-5 bg-white sm:p-6">
            <fieldset className="grid grid-cols-6 gap-6" disabled={pending}>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name="username" id="username" autoComplete="username" disabled readOnly
                       className="form-input" defaultValue={user.username}/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" id="name" autoComplete="full-name"
                       className="form-input" defaultValue={user.name}/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" id="email" autoComplete="email"
                       className="form-input" defaultValue={user.email}/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="phone" className="form-label">Phone number</label>
                <input type="tel" name="phone" id="phone" autoComplete="phone"
                       className="form-input" defaultValue={user.phone}/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="website" className="form-label">Website</label>
                <input type="text" name="website" id="website" autoComplete="website"
                       className="form-input" defaultValue={user.website}/>
              </div>

            </fieldset>
          </div>
          <div
            className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </div>
          <div className="px-4 py-5 bg-white sm:p-6">
            <fieldset className="grid grid-cols-6 gap-6" disabled={pending}>

              <div className="col-span-6">
                <label htmlFor="street" className="form-label">Street</label>
                <input type="text" name="street" id="street" autoComplete="street"
                       className="form-input" defaultValue={user.address.street}/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="suite" className="form-label">Suite</label>
                <input type="text" name="suite" id="suite"
                       className="form-input" defaultValue={user.address.suite}/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                <label htmlFor="zipcode" className="form-label">Zip Code</label>
                <input type="text" name="zipcode" id="zipcode" autoComplete="postal-code"
                       className="form-input" defaultValue={user.address.zipcode}/>
              </div>

              <div className="col-span-6 sm:col-span-4 lg:col-span-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" name="city" id="city"
                       className="form-input" defaultValue={user.address.city}/>
              </div>


            </fieldset>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-between items-center">
            {error ? (<div className="text-sm text-red-700">
              {error}
            </div>) : (<div/>)}
            <button type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Save
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Users;

export const getServerSideProps = withAuthOnly(async (context, authUser) => {
  const { id } = context.params;
  const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.json());

  return { props: { authUser, user } };
});
