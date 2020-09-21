const charset =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/** @returns {string} */
export const getRandomString = (length = 5) =>
  Array.apply(null, Array(length))
    .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
    .join('');
