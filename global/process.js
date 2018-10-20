/*jshint esnext: true */

/* @DOC
A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f
*/


process.on('unhandledRejection', (reason, p) => {
    console.log('@ Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
    console.trace(reason.stack);
});

process.on('SIGTERM', function() {
    console.log("SIGTERM recieved");
});

process.on('SIGUSR1', function() {
    console.log("SIGUSR1 recieved");
});
