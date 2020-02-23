import { IMediaFile } from './IMediaFile';

export class MediaFile extends IMediaFile{

    constructor(mediaObject:any){
        super();
        this.ownerId = mediaObject.ownerId;
        this.fileType = mediaObject.fileType;
        this.size = mediaObject.size;
        this.path = mediaObject.path;
        this.fileName = mediaObject.fileName;
        this.date = mediaObject.date;
        this.format = mediaObject.format;
        this.id = mediaObject._id;
    }

   
 }