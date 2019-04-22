const passport = require("passport");

exports.socialLogin = async (req, res, next) => {
  passport.authenticate("google", {
    scope: ["email profile"],
    prompt: "select_account"
  })(req, res, next);
};

exports.socialCallback = async (req, res, next) => {
  const baseUrl = process.env.BASE_URL;
  const provider = req.params.provider;
  // console.log(provider);
  passport.authenticate(
    `${provider}`,
    { failureRedirect: `${baseUrl}/loginFail` },
    async (err, userInfo) => {
      if (err) return next(err);
      // console.log(`Got user from passport ${userInfo}`);

      const user = {
        id: userInfo.sid,
        email: userInfo.email,
        username: userInfo.username,
        avatar: userInfo.avatar
      };

      req.login(user, err => {
        if (err) return next(err);
        // console.log("login called");
        return res.redirect(`${baseUrl}/@${user.username}/boards`);
      });
    }
  )(req, res, next);
};
