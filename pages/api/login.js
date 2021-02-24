import withSession from '../../lib/withSession';

function auth(username, password) {
  if (username === 'demo' && password === 'password') {
    return { id: 1, username, name: 'Demo User', email: 'demo@example.com' };
  }

  return null;
}

export default withSession(async (req, res) => {
  console.log('req.body', req.body);
  const { username, password } = req.body;
  const user = auth(username, password);
  if (user) {
    req.session.set('authUser', user);
    await req.session.save();
    return res.status(200).json(user);
  }

  return res.status(401).json({ message: 'The username or password is incorrect.' });
  // return res.status(401).send('The username or password is incorrect.');
});
