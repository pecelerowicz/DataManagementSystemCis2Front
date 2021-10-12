export interface ProjectInfoResponse {
    name: string;
    username: string;
}

export interface GetProjectResponse {
    id: number;
    name: string;
    description: string;
    localDate: string; // ?
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[]
}

export interface GetProjectsResponse {
    getProjectResponseList: GetProjectResponse[];
}

export interface CreateProjectRequest {
    projectName: string;
    description: string;
}

export interface CreateProjectResponse {
    id: number;
    projectName: string;
    description: string;
    localDate: string; // ?
    ownerName: string;
}

export interface UpdateProjectRequest {
    projectId: number;
    newName: string;
    newDescription: string;
}

export interface UpdateProjectResponse {
    id: number;
    projectName: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}

export interface AddUserRequest {
    projectId: number;
    userName: string;
}

export interface AddUserResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[]; //?
}

export interface RemoveUserFromOwnedProjectRequest {
    projectId: number;
    userName: string;
}

export interface RemoveUserFromOwnedProjectResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}

export interface AddMyInfoToOwnedProjectRequest {
    infoName: string;
    projectId: number;
}

export interface AddMyInfoToOwnedProjectResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}

export interface RemoveInfoFromOwnedProjectRequest {
    projectId: number;
    username: string;
    infoName: string;
}

export interface RemoveInfoFromOwnedProjectResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}

export interface DeleteOwnedProjectRequest {
    projectId: number;
}

//

export interface AddMyInfoToOtherProjectRequest {
    infoName: string;
    projectId: number;
}

export interface AddMyInfoToOtherProjectResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}

export interface RemoveMyInfoFromOtherProjectRequest {
    infoName: string;
    projectId: number;
}

export interface RemoveMyInfoFromOtherProjectResponse {
    projectId: number;
    name: string;
    description: string;
    localDate: string;
    ownerName: string;
    memberNames: string[];
    projectInfoResponseList: ProjectInfoResponse[];
}