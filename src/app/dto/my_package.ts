export interface PackageResponse {
    name: string;
    hasStorage: boolean;
    hasMetadata: boolean;
    title: string;
    shortDescription: string;
    localDate: string;
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
