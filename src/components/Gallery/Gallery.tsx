import * as React from 'react';

export interface IGalleyProps {
}

export const Gallery = React.memo((props: IGalleyProps) => {
  console.log('I never going to rerender');
  return (
    <div>
      This is Gallery Component!
    </div>
  );
}, () => true);
