import { List } from 'immutable';
import { ImageModel } from '../../models/ImageModel';
import React from 'react';
import { ImagesListItem } from '../ImageListItem/ImageListItem';

export interface ImagesListProps {
  images: List<ImageModel>;
}

export const ImagesList: React.FC<ImagesListProps> = props => {
  return (
    <ul>
      {props.images.map((image, index) => (
        <ImagesListItem key={index} image={image} />
      ))}
    </ul>
  );
};
