import { ImageModel } from '../../models/ImageModel';
import React from 'react';
import {style} from 'typestyle';

export interface ImagesListItemProps {
  image: ImageModel;
}

const imgClass = style({
    width: '100px',
    height: '100px'
});

export const ImagesListItem: React.FC<ImagesListItemProps> = props => {
  return (
    <li className="image-item">
      <div className="id">{props.image.id}</div>
      <div>
        <img className={imgClass} src={props.image.path} alt=""/>
      </div>
    </li>
  );
};
