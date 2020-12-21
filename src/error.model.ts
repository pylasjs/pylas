export interface ErrorReport {
    lib: string;
    timestamp: number;
    message: string;
    trusted: boolean;
    stack: ErrorStack;
    behavior: ErrorBehavior;
    page: ErrorPage;
}

interface ErrorStack {
    filename: string;
    lineno: number;
    colno: number;
    stack: string[];
}

interface ErrorBehavior {
    defaultPrevented: boolean;
    eventPhase: number;
}

interface ErrorPage {
    url: string;
    state: any;
    referrer: string;
    title: string;
}