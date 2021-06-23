export interface CreateMetadataRequest {
    metadataName: string;
}

export interface CreateMetadataResponse {
    metadataName: string;
}

export interface UploadFileRequest {
    packageName: string;
    folderRelativePath: string
}