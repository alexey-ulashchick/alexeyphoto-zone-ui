/**
 * ImageMdodel. Contains meta infromation about image.
 */
export class ImageModel {

    id: string;
    path: string;

    constructor (id: string, path: string) {
        this.id = id;
        this.path = path;
    }

}