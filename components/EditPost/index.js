import React, { useCallback, useState } from 'react';

async function updateOrCreatePost(id, data) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id || ''}`, {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json());
}

const EditPost = ({ post, onClose, onChange }) => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const cancel = useCallback((event) => {
    event.preventDefault();
    return onClose && onClose();
  }, [onClose]);

  const save = useCallback((event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const id = post ? post.id : null;
    const data = {
      title: form.get('title'),
      body: form.get('body'),
      userId: 1
    };
    setPending(true);
    updateOrCreatePost(id, data)
      .then(value => {
        onChange && onChange(value);
        onClose && onClose();
      })
      .catch(reason => {
        setPending(false);
        setError(reason.message);
      });
  }, [setPending, setError, onClose, onChange]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={cancel}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"/>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <form onSubmit={save} onReset={cancel}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <fieldset className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" id="title" name="title" placeholder="Post title"
                     defaultValue={post && post.title || ''}
                     className="form-input"/>
            </div>
            <div className="mb-2">
              <label htmlFor="body" className="form-label">Body:</label>
              <textarea rows="5" id="body" name="body" defaultValue={post && post.body || ''}
                        className="form-input"/>
            </div>
          </fieldset>
          {error && (
            <div className="mb-2 flex justify-center items-center">
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" disabled={pending}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button type="reset" disabled={pending}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>);
};

export default EditPost;
