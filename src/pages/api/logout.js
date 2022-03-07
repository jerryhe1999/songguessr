import { clearAuthCookie } from '../../lib/auth';

export default (req, res) => {
  clearAuthCookie(res);
  res.status(200).end();
};
