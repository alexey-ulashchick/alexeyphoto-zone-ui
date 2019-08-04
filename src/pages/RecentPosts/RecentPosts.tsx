import * as React from 'react';
import { Gallery } from '../../components/Gallery/Gallery';

export interface IRecentPostsProps {
}

export function RecentPosts (props: IRecentPostsProps) {
  return (
    <div>
      This is RecentPosts Page!
      <Gallery />
    </div>
  );
}
