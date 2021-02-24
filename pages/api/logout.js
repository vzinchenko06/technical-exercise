import withSession from '../../lib/withSession';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.status(200).send();
});
