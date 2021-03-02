export interface PackagesResponse {
    packagesNames: string[];
}

export interface CreatePackageRequest {
    packageName: string;
}

export interface CreatePackageResponse {
    packageName: string;
}

export interface CreateFolderRequest {
    newFolderName: string;
    parentFolderFullPath: string;
}

export interface CreateFolderResponse {
    newFolderFullName: string;
}

export interface DeletePackageRequest {
    packageName: string;
}

export interface DeletePackageResponse {
    deleteMessage: string;
}

export interface StorageAndMetadataResponse {
    name: string;
    hasStorage: boolean;
    hasMetadata: boolean;
}

export interface StorageAndMetadataListResponse {
    storageAndMetadataResponseList: StorageAndMetadataResponse[];
}