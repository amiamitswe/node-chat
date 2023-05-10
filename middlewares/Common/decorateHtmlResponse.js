function decorateHtmlResponse(app_title) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${app_title} - ${process.env.APP_NAME}`;
    res.locals.loggedInYser = {};
    res.locals.errors = {};
    res.locals.data = {};

    next();
  };
}

module.exports = decorateHtmlResponse;
