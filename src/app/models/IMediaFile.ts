export class IMediaFile {
    
    ownerId: string;
    fileType: string;
    size: string;
    path: string;
    fileName: string;
    file: any;
    date: String;
    format: string;
    id: string;

    setFormat(typeString:string){
        let arr = typeString.split('/');
        this.format = arr[arr.length-1] as string;
    }

    
}