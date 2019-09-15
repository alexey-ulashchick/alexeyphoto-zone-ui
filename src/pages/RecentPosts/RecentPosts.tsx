import * as React from 'react';
import { Gallery } from '../../components/Gallery/Gallery';
import { RecentPostsStyles } from './RecentPostsStyles';
import { List } from 'immutable';

export interface IRecentPostsProps {}

export function RecentPosts(props: IRecentPostsProps) {
  const files = List([
    'assets/hawaii/20190629-0001.jpg',
    'assets/hawaii/20190630-0002.jpg',
    'assets/hawaii/20190701-0003.jpg',
    'assets/hawaii/20190701-0004.jpg',
    'assets/hawaii/20190701-0005.jpg',
    'assets/hawaii/20190701-0006.jpg',
    'assets/hawaii/20190701-0007.jpg',
    'assets/hawaii/20190701-0008.jpg',
    'assets/hawaii/20190701-0009.jpg',
    'assets/hawaii/20190701-0010.jpg',
    'assets/hawaii/20190701-0011.jpg',
    'assets/hawaii/20190701-0012.jpg',
    'assets/hawaii/20190701-0013.jpg',
    'assets/hawaii/20190702-0014.jpg',
    'assets/hawaii/20190702-0015.jpg',
    'assets/hawaii/20190702-0016.jpg',
    'assets/hawaii/20190702-0017.jpg',
    'assets/hawaii/20190702-0018.jpg',
    'assets/hawaii/20190702-0019.jpg',
    'assets/hawaii/20190702-0020.jpg',
    'assets/hawaii/20190703-0021.jpg',
    'assets/hawaii/20190703-0022.jpg',
    'assets/hawaii/20190703-0023.jpg',
    'assets/hawaii/20190703-0024.jpg',
    'assets/hawaii/20190703-0025.jpg',
    'assets/hawaii/20190703-0026.jpg',
    'assets/hawaii/20190703-0027.jpg',
    'assets/hawaii/20190703-0028.jpg',
    'assets/hawaii/20190703-0029.jpg',
    'assets/hawaii/20190703-0030.jpg',
    'assets/hawaii/20190703-0050.jpg',
    'assets/hawaii/20190704-0031.jpg',
    'assets/hawaii/20190705-0032.jpg',
    'assets/hawaii/20190705-0033.jpg',
    'assets/hawaii/20190705-0034.jpg',
    'assets/hawaii/20190705-0035.jpg',
    'assets/hawaii/20190705-0036.jpg',
    'assets/hawaii/20190705-0037.jpg',
    'assets/hawaii/20190705-0038.jpg',
    'assets/hawaii/20190705-0039.jpg',
    'assets/hawaii/20190705-0040.jpg',
    'assets/hawaii/20190705-0041.jpg',
    'assets/hawaii/20190705-0042.jpg',
    'assets/hawaii/20190705-0043.jpg',
    'assets/hawaii/20190705-0044.jpg',
    'assets/hawaii/20190707-0045.jpg',
    'assets/hawaii/20190707-0046.jpg',
    'assets/hawaii/20190707-0047.jpg',
    'assets/hawaii/20190707-0048.jpg',
    'assets/hawaii/20190707-0049.jpg',
  ]);

  return (
    <div className={RecentPostsStyles}>
      <Gallery files={files}/>
    </div>
  );
}
