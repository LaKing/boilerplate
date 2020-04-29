
// Not sure if the Purge function really makes sence. After all, the session will expire sooner or later ...

function purge(session_i) {
    let sid = session_i._id;
    let session = session_i.session;

    const now = new Date();

    if (!session.simplepay) return;
  
    for (let i = 0; i < session.simplepay.length; i++) {
        if (session.simplepay[i].timeout) {
            let idate = new Date(session.simplepay[i].timeout);
            if (now > idate) {
                Ł(session.simplepay.splice(i, 1));
            }
        }
    }
  
    ß.session_store.set(sid, session);
}

module.exports = function() {
    ß.session_store.all(function(err, sessions) {
        if (err) return đ(err);

        // so look at all sessions
        for (let i = 0; i < sessions.length; i++) {
            // that have a simplepay property array
            if (sessions[i].session.simplepay) purge(sessions[i]);
        }
    });
};
