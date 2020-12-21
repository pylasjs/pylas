"use strict";
(() => {
    var _a;
    // Get group ID
    const lib = ((_a = document.currentScript) === null || _a === void 0 ? void 0 : _a.src) || 'Unknown';
    window.addEventListener("error", (err) => {
        const stack = err.error && err.error.stack && err.error.stack.split('\n') || [];
        const report = {
            lib: lib,
            timestamp: err.timeStamp || "Unknown",
            message: err.message || "Unknown",
            trusted: err.isTrusted || "Unknown",
            stack: {
                filename: err.filename || "Unknown",
                lineno: err.lineno || "Unknown",
                colno: err.colno || "Unknown",
                stack: stack.map((line) => line.trim()),
            },
            behavior: {
                defaultPrevented: err.defaultPrevented,
                eventPhase: err.eventPhase || "Unknown",
            },
            page: {
                url: window.location.href || 'Unknown',
                state: history.state,
                referrer: document.referrer,
                title: document.title,
            },
        };
        console.log(report);
    });
    window.pylas = () => {
        return {
            log: (message) => {
                console.log(message);
            }
        };
    };
})();
//# sourceMappingURL=pylas.js.map