export default function useDebounce(callback: (t: string) => Promise<void> | void) {
    let timeout: null | NodeJS.Timeout = null;

    return (txt: string) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        const t = setTimeout(() => {
            callback(txt);
            timeout = null;
        }, 500);
        timeout = t;
    };
}
