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