export interface CreateFolderRequest {
    newFolderName: string;
    packageName: string;
    parentFolderRelativePath: string;
}

export interface CreateFolderResponse {
    newFolderFullName: string;
}