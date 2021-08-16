export interface CreateFolderRequest {
    newFolderName: string;
    packageName: string;
    parentFolderRelativePath: string;
}

export interface CreateFolderResponse {
    newFolderFullName: string;
}

export interface DeleteItemRequest {
    packageName: string;
    itemPathString: string;
}

export interface DeleteItemResponse {
    deleteFolderMessage: string;
}