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
    memberName: string[];
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
