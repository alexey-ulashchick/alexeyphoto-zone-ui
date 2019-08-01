import { List } from "immutable";
import { ImageModel } from "../../models/ImageModel";
import React from "react";

export interface ImagesListProps {
  images: List<ImageModel>;
}

export const ImagesList: React.FC<ImagesListProps> = props => {
  return <div>This is images list component.</div>;
};
