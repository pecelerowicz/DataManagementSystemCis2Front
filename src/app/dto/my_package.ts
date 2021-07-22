export interface PackageResponse {
    name: string;
    hasStorage: boolean;
    hasMetadata: boolean;
}

export interface GetPackageListResponse {
    packageResponseList: PackageResponse[];
}

export interface CreatePackageRequest {
    packageName: string;
}

export interface CreatePackageResponse {
    createPackageMessage: string;
}

export interface DeletePackageRequest {
    packageName: string;
}

export interface DeletePackageResponse {
    deleteMessage: string;
}
