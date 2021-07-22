interface TestInfoDto {
    infoName: string;
    testField1: string;
    testField2: string;
    testField3: string;
    testField4: string;
    testField5: string;
}

export interface GetTestInfoResponse extends TestInfoDto {
}

export interface CreateTestInfoRequest extends TestInfoDto {
}

export interface CreateTestInfoResponse extends TestInfoDto {
}

export interface UpdateTestInfoRequest extends TestInfoDto {
}

export interface UpdateTestInfoResponse extends TestInfoDto {
}

export interface DeleteTestInfoRequest {
    infoName: string;
}

export interface DeleteTestInfoResponse {
    infoName: string;
    deleteMessage: string;
}