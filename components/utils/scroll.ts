/**
 * Options for intersection observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @example
 * // A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
 * let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
    }
    let observer = new IntersectionObserver(callback, options);
 */

/**
 * Creates an intersection observer and observes the element
 * @param element element to look at
 * @param threshold between 0 and 1, where 1 is 100% of the element is needed in view to trigger the callback
 * @param callback function to execute when the threshold is reached
 */
export function createScrollObserver(element: HTMLElement, threshold: number, intersectCallback: Function, intersectParams?: any, deIntersectCallback?: Function, deIntersectParams?: any) {
    const intersectObserverOptions: IntersectionObserverInit = {
        root: document.querySelector("#app"),
        rootMargin: "0px",
        threshold: threshold
    }
    // generate a callback function
    const intersectionCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                intersectCallback(intersectParams);
            } else {
                if (deIntersectCallback) {
                    deIntersectCallback(deIntersectParams);
                }
            }
        }
    }

    let intersectObserver = new IntersectionObserver(intersectionCallback, intersectObserverOptions);
    intersectObserver.observe(element);
}