import * as React from 'react';
import { Gallery } from '../../components/Gallery/Gallery';
import { RecentPostsStyles } from './RecentPostsStyles';

export interface IRecentPostsProps {
}

export function RecentPosts (props: IRecentPostsProps) {
  return (
    <div className={RecentPostsStyles}>
      <Gallery />
    </div>
  );
}
