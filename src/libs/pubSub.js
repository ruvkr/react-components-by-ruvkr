export const pubSub = () => {
  /** @type {{ id: number; callback: function; config: {} }[]} */
  let subscribers = [];
  let id = -1;

  /**
   * Will return an uniq `id`. This `id` will be needed when unsubscribing.
   *
   * @example
   *   const ps = pubSub();
   *   const id = ps.subscribe(callback, config);
   *   ps.unsubscribe(id);
   */
  const subscribe = (callback = () => {}, config = {}) => {
    if (typeof callback === 'function') {
      id++;
      subscribers.push({ id, callback, config });
      return id;
    }
  };

  /**
   * Should be called with the `id` recieved when subscribing;
   *
   * @example
   *   const ps = pubSub();
   *   const id = ps.subscribe(callback);
   *   ps.unsubscribe(id);
   */
  const unsubscribe = (id = -1) => {
    const index = subscribers.findIndex(s => s.id === id);
    if (index !== undefined) subscribers.splice(index, 1);
  };

  /**
   * Publish will call all the callbacks.
   *
   * @example
   *   const ps = pubSub();
   *   const id = ps.subscribe(callback);
   *   ps.publish('Hello');
   */
  const publish = data => {
    for (let i = 0; i < subscribers.length; i++) {
      subscribers[i].callback(data);
    }
  };

  /** PublishToLast will only call last subscribed callback. */
  const publishToLast = data => {
    const last = subscribers[subscribers.length - 1];
    last && last.callback(data);
  };

  /** Returns `true` if `id` is currently subscribed. */
  const isSubscribed = (id = -1) => {
    return subscribers.find(s => s.id === id) !== undefined;
  };

  /** Returns all the subscribers. */
  const getSubscribers = () => {
    return subscribers;
  };

  /** Returns `true` if any subscribers currently subscribed. */
  const hasSubscribers = () => {
    return subscribers.length !== 0;
  };

  /** Will unsubscribe all callbacks from current instance. */
  const unsubscribeAll = () => {
    subscribers = [];
    id = -1;
  };

  /**
   * Returns `true` if this is the last subscribed callback.
   *
   * @example
   *   ps.isLast(id); // boolean
   */
  const isLastSubscribed = (id = -1) => {
    return subscribers[subscribers.length - 1].id === id;
  };

  /** Returns last subscriber */
  const getLast = () => {
    return subscribers[subscribers.length - 1];
  };

  return {
    subscribe,
    unsubscribe,
    publish,
    publishToLast,
    isSubscribed,
    getSubscribers,
    hasSubscribers,
    unsubscribeAll,
    isLastSubscribed,
    getLast,
  };
};
