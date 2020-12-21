(() => {
    // Get group ID
    const lib = (document.currentScript as HTMLScriptElement)?.src || 'Unknown';
    
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
                stack: stack.map((line: string) => line.trim()),
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

    (window as any).pylas = () => {
        return {
            log: (message: string) => {
                console.log(message);
            }
        }
    };
})();