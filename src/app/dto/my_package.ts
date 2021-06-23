export interface PackageResponse {
    name: string;
    hasStorage: boolean;
    hasMetadata: boolean;
}

export interface GetPackageListResponse {
    packageResponseList: PackageResponse[];
}

export interface DeletePackageRequest {
    packageName: string;
}

export interface DeletePackageResponse {
    deleteMessage: string;
}