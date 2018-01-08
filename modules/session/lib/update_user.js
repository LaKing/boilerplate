/*jshint esnext: true */

const lib = ß.lib;

module.exports = function(session, user) {
    const app = ß.app;

    if (!session) return;

    session.debug = app.locals.settings.debug;
    session.is_admin = lib.admin.check_if_admin(user._id);
    session.user = user;

    if (session.user.profile)
        if (!session.user.profile.email) {
            if (user.local.email) session.user.profile.email = user.local.email;
        }
    //console.log("@session update_with_user", session, user);

    // ide kell egy mentés a user-be is!

    session.save();
};
