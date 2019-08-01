export interface IImageModel {
    id: string;
    path: string;
}

/**
 * ImageMdodel. Contains meta infromation about image.
 */
export class ImageModel implements IImageModel{

    id: string;
    path: string;

    constructor (id: string, path: string) {
        this.id = id;
        this.path = path;
    }

    static fromObj(obj: IImageModel) {
        return new ImageModel(obj.id, obj.path);
    }
}