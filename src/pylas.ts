import { ErrorReport } from "./error.model";

(() => {
    if ( 'pylas' in window ) {
        console.debug('Pylas already loaded. Exiting');
        return;
    }

    // Get group ID
    const lib = (document.currentScript as HTMLScriptElement)?.src || 'Unknown';
    const URL = 'https://us-central1-pylasjs.cloudfunctions.net/report';
    const reports = []; // catch for future

    const createReport = (error: ErrorEvent): ErrorReport => {
        const stack = error.error && error.error.stack && error.error.stack.split('\n') || [];

        const report = {
            lib: lib,
            timestamp: error.timeStamp,
            message: error.message || "Unknown",
            trusted: error.isTrusted,
            stack: {
                filename: error.filename || "Unknown",
                lineno: error.lineno,
                colno: error.colno,
                stack: stack.map((line: string) => line.trim()),
            },
            behavior: {
                defaultPrevented: error.defaultPrevented,
                eventPhase: error.eventPhase,
            },
            page: {
                url: window.location.href || 'Unknown',
                state: history.state,
                referrer: document.referrer,
                title: document.title,
            },
        };

        return report;
    }

    const sendReport = (report: ErrorReport) => {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(report)
        }).then(response => {
            // do nothing for now
        }).catch(error => {
            console.log('Pylas had error sending report', error);
        });
    }

    const handleError = (error: ErrorEvent) => {
        const report = createReport(error);
        sendReport(report);
    }
    
    window.addEventListener("error", handleError);

    (window as any).pylas = {
        log: (message: string) => {
            console.log(message);
        },
        report: handleError,
        debug: {
            lib,
        }
    };
})();