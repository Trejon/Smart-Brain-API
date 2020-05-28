const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  if (!authorization) {
    return res.status(401).json('Unathorized');
  } 
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unathorized')
    }
    console.log('You shall pass');
    return next();
  })

}

module.exports = {
  requireAuth: requireAuth
}


