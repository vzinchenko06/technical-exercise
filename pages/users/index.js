import React from 'react';
import withAuthOnly from '../../lib/withAuthOnly';
import Layout from '../../components/Layout';
import { useAuthOnly } from '../../lib/AuthContext';
import usePages from '../../lib/usePages';
import Paginator from '../../components/Paginator';

const Users = (props) => {
  useAuthOnly();
  const { page, total, items, setPage, length } = usePages(props.users, 1, 15);

  return (
    <Layout title="Users">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {items.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="inline-block h-10 w-10 rounded-full flex justify-center items-center">
                            <span className="uppercase">{String(user.name)
                              .split(' ')
                              .slice(0, 2)
                              .map(value => value[0])
                              .join('')}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.company.name}</div>
                      <div className="text-sm text-gray-500">{user.company.bs}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                ))}
                </tbody>
                <tfoot className="bg-gray-50">
                <tr>
                  <th colSpan="3">
                    <div className="flex justify-between items-center px-6 py-4">
                      <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total: {length}
                      </div>
                      {total <= 1 ? null : <Paginator page={page} total={total} onPage={setPage}/>}
                    </div>
                  </th>
                </tr>
                </tfoot>
              </table>

            </div>
          </div>
        </div>
      </div>


    </Layout>
  );
};

export default Users;

export const getServerSideProps = withAuthOnly(async (context, authUser) => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json());

  return { props: { authUser, users } };
});
