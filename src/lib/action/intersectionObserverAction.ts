interface ActionParameters {
	callback: IntersectionObserverCallback;
	options?: IntersectionObserverInit;
}

export const intersectionObserverAction = (
	target: HTMLElement,
	{ callback, options }: ActionParameters
) => {
	const observer = new IntersectionObserver(callback, options);
	observer.observe(target);

	return {
		destroy() {
			observer.unobserve(target);
		}
	};
};
