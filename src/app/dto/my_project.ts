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
    projectInfoResponseList: ProjectInfoResponse;
}
