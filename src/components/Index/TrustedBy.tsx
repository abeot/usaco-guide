import * as React from 'react';
import { useEffect, useState } from 'react';

export default function TrustedBy() {
  const [numUsers, setNumUsers] = useState(-1);
  const [numPageviews, setNumPageviews] = useState(-1);
  const [numStars, setNumStars] = useState(-1);
  useEffect(() => {
    fetch('https://usaco-guide.firebaseio.com/pageviews.json')
      .then(resp => resp.json())
      .then(pageviews => {
        setNumPageviews(parseInt(pageviews));
      });
    fetch('https://usaco-guide.firebaseio.com/num_users.json')
      .then(resp => resp.json())
      .then(numUsers => {
        setNumUsers(parseInt(numUsers));
      });
    fetch('https://api.github.com/repos/cpinitiative/usaco-guide')
      .then(resp => resp.json())
      .then(data => {
        setNumStars(data.stargazers_count);
      });
  }, []);

  const usersText = Math.floor(numUsers / 1000) + 'k';
  const pageviewsText = (numPageviews / 1000000).toFixed(1) + 'M';

  return (
    <div className="max-w-4xl">
      <dl className="rounded-lg sm:grid sm:grid-cols-3">
        <div className="flex flex-col py-2 sm:p-0">
          <dt className="order-2 text-lg leading-6 font-medium text-gray-600 dark:text-gray-400">
            Registered Users
          </dt>
          <dd
            className={`order-1 text-4xl leading-normal font-extrabold text-blue-500 sm:text-5xl sm:leading-normal ${
              numUsers === -1 ? 'opacity-0' : 'opacity-100'
            } transition`}
            title={numUsers !== -1 ? `${numUsers} registered users` : undefined}
          >
            {usersText}
          </dd>
        </div>
        <div className="flex flex-col py-2 sm:p-0">
          <dt className="order-2 text-lg leading-6 font-medium text-gray-600 dark:text-gray-400">
            Pageviews
          </dt>
          <dd
            className={`order-1 text-4xl leading-normal font-extrabold text-blue-500 sm:text-5xl sm:leading-normal ${
              numPageviews === -1 ? 'opacity-0' : 'opacity-100'
            } transition`}
            title={
              numPageviews !== -1 ? `${numPageviews} pageviews` : undefined
            }
          >
            {pageviewsText}
          </dd>
        </div>
        <div className="flex flex-col py-2 sm:p-0">
          <dt className="order-2 text-lg leading-6 font-medium text-gray-600 dark:text-gray-400">
            GitHub Stars
          </dt>
          <dd
            className={`order-1 text-4xl leading-normal font-extrabold text-blue-500 sm:text-5xl sm:leading-normal ${
              numStars === -1 ? 'opacity-0' : 'opacity-100'
            } transition`}
          >
            {numStars}
          </dd>
        </div>
      </dl>
    </div>
  );
}
