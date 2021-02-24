import withAuthOnly from '../../lib/withAuthOnly';
import { useAuthOnly } from '../../lib/AuthContext';
import Layout from '../../components/Layout';
import usePages from '../../lib/usePages';
import Paginator from '../../components/Paginator';
import EditPost from '../../components/EditPost';
import { useCallback, useState } from 'react';

const Posts = (props) => {
  useAuthOnly();
  const [posts, setPosts] = useState(Array.from(props.posts));
  const { page, total, items, setPage } = usePages(posts, 1, 10);
  const [editPost, setEditPost] = useState(undefined);

  const updatePost = useCallback(
    (post) => setPosts(state => {
      const index = state.findIndex(value => value.id === post.id);
      console.log('-> updatePost.setPosts', post, index);
      state.splice(index, 1, post);
      return Array.from(state);
    }),
    [setPosts]
  );

  return (
    <Layout title="Posts">
      {items.map((item) => (<div key={item.id} className="bg-white shadow mb-4 px-6 py-4">
        <div className="mb-2 border-b border-gray-200 flex justify-between">
          <h2 className="text-lg font-medium ">{item.title}</h2>
          <button className="text-indigo-600 hover:text-indigo-900" onClick={setEditPost.bind(null, item)}>Edit</button>
        </div>
        <div>{item.body}</div>
      </div>))}
      <div className="flex justify-center pt-4 pb-8">
        <Paginator page={page} total={total} onPage={setPage}/>
      </div>

      {editPost && (
        <EditPost post={editPost} onClose={setEditPost.bind(null, undefined)} onChange={updatePost}/>
      )}
    </Layout>
  );
};

export default Posts;

export const getServerSideProps = withAuthOnly(async (context, authUser) => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json());

  return { props: { authUser, posts } };
});
