/* @flow */

export const handleResponse = res => {
  return new Promise((resolve, reject) => {
    if (!res.ok) {
      try {
        res.json()
          .then(data => reject(data))
          .catch(err => reject(err));
      } catch (e) {
        reject('handleResponse: Error');
      }
    } else {
      res.json().then(data => resolve(data))
        .catch(err => reject(err));
    }
  });
};
