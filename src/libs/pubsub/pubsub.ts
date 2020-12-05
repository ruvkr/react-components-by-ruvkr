import { Subscriber } from './types';

export type PubSubInterface = ReturnType<typeof pubsub>;

export function pubsub() {
  let subscribers: Subscriber[] = [];
  let id = -1;

  function subscribe(callback: Function, config?: any): number {
    id++;
    if (config != null) subscribers.push({ id, callback, config });
    else subscribers.push({ id, callback });
    return id;
  }

  function unsubscribe(id: number) {
    const index = subscribers.findIndex(s => s.id === id);
    if (index > -1) subscribers.splice(index, 1);
  }

  function update(id: number, callback: Function, config?: any) {
    const subscriber = subscribers.find(s => s.id === id);
    if (subscriber) {
      subscriber.callback = callback;
      if (config != null) subscriber.config = config;
    }
  }

  function publish(payload?: any) {
    for (const { callback } of subscribers) callback(payload);
  }

  function publishToLast(payload?: any) {
    const last = subscribers[subscribers.length - 1];
    last && last.callback(payload);
  }

  function isSubscribed(id: number) {
    return subscribers.find(s => s.id === id) !== undefined;
  }

  function getSubscribers(): Subscriber[] {
    return subscribers;
  }

  function hasSubscribers(): boolean {
    return subscribers.length > 0;
  }

  function unsubscribeAll() {
    subscribers = [];
    id = -1;
  }

  function isLastSubscribed(id: number): boolean {
    const subscriber = subscribers[subscribers.length - 1];
    return subscriber && subscriber.id === id;
  }

  function getLast(): Subscriber | null {
    return subscribers[subscribers.length - 1] || null;
  }

  return {
    subscribe,
    unsubscribe,
    publish,
    update,
    publishToLast,
    isSubscribed,
    getSubscribers,
    hasSubscribers,
    unsubscribeAll,
    isLastSubscribed,
    getLast,
  };
}
