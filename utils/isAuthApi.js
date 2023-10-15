const Auth = (req, res, next) => {
    // If the user isn't logged in and trying to access API, send them error message asking to login
    if (!req.session.logged_in) {
      res.json({message:"you do not currently have access to this API, please log in."});
    } else {
      next();
    }
  };
  
  module.exports = Auth;