const isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {    

        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
  }
  
  req.session.redirectUrl = req.originalUrl;

  next();
};

const saveRedirectUrl = (req, res, next) => {

    if(req.session.redirectUrl){

        res.locals.redirectUrl = req.session.redirectUrl;        
    }
    next();
}

module.exports = {

    isLoggedIn,
    saveRedirectUrl
}