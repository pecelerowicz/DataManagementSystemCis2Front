import { CreateDifrInfoRequest, GetDifrInfoResponse, UpdateDifrInfoResponse } from "../info/difr_info/difr_info";
import { CreateTestInfoRequest, GetTestInfoResponse, UpdateTestInfoResponse } from "../info/test_info/test_info";

interface InfoDto {
    infoName: string;
    access: Access;
    shortName: string;
    longName: string;
    description: string;
    localDate?: string;
}

export interface GetInfoResponse extends InfoDto {
    getDifrInfoResponse: GetDifrInfoResponse;
    getTestInfoResponse: GetTestInfoResponse;
}

export interface GetInfoListResponse {
    infoNameList: string[];
}

export interface CreateInfoRequest extends InfoDto {
}

export interface CreateInfoResponse extends InfoDto {
}

export interface UpdateInfoRequest extends InfoDto {
    createDifrInfoRequest: CreateDifrInfoRequest;
    createTestInfoRequest: CreateTestInfoRequest;
}

export interface UpdateInfoResponse extends InfoDto {
    updateDifrInfoResponse: UpdateDifrInfoResponse;
    updateTestInfoResponse: UpdateTestInfoResponse;
}

export interface DeleteInfoRequest {
    infoName: string;
}

export interface DeleteInfoResponse {
    infoName: string;
    deleteMessage: string;
}

export enum Access {
  private = "PRIVATE", protected = "PROTECTED", public = "PUBLIC"
}
