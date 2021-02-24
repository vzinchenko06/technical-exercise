import withSession from './withSession';

export default function withAuthOnly(next) {
  return withSession((context) => {
    const session = context.req.session;
    const authUser = session.get('authUser');

    if (!authUser) return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };

    if (typeof next === 'function')
      return next(context, authUser);

    return { props: { authUser } };
  });
}
