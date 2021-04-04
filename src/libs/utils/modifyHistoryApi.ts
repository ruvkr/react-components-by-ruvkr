export function modifyHistoryApi() {
  // update pushState function
  window.history.pushState = (f => {
    return function pushState(this: History) {
      var ret = f.apply(this, arguments as any);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
  })(window.history.pushState);

  // update replaceState function
  window.history.replaceState = (f => {
    return function replaceState(this: History) {
      var ret = f.apply(this, arguments as any);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
  })(window.history.replaceState);
}
