export interface PackageResponse {
    name: string;
    hasStorage: boolean;
    hasMetadata: boolean;
    archived: boolean,
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

export interface RenamePackageRequest {
    packageOldName: string;
    packageNewName: string;
}

export interface RenamePackageResponse {
    renamePackageMessage: string;
}

export interface DeletePackageRequest {
    packageName: string;
}

export interface DeletePackageResponse {
    deleteMessage: string;
}

export interface ArchivePackageRequest {
    packageName: string;
}

export interface ArchivePackageResponse {
    archivePackageMessage: string;
}

export interface IsArchivedResponse {
    archived: boolean;
}

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

export interface CreateStorageRequest {
    storageName: string;
}

export interface CreateStorageResponse {
    createStorageMessage: string;
}

export interface UploadFileRequest {
    packageName: string;
    folderRelativePath: string;
}

export interface Node {
    relative: string;
    folder: boolean;
    children: Node[];
}