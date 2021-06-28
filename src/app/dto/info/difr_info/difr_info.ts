interface DifrInfoDto {
    infoName: string;
    geometry: Geometry;
    incidentSoller: number;
    incidentSlit: number; 
    detectorSoller: number;
    detectorSlit: number;
    detectorAbsorber: DetectorAbsorber;
    generatorVoltage: number;
    generatorCurrent: number;
    dataRangeStart: number;
    dataRangeEnd: number;
    stepSize: number;
    stepTime: number;
    stage: Stage;
    spinningRocking: boolean;
    spinningRockingVelocity: number;
    temperature: number;
    comments: string;
}

export interface GetDifrInfoResponse extends DifrInfoDto {
}

export interface CreateDifrInfoRequest extends DifrInfoDto {
}

export interface CreateDifrInfoResponse extends DifrInfoDto {
}

export interface UpdateDifrInfoRequest extends DifrInfoDto {
}

export interface UpdateDifrInfoResponse extends DifrInfoDto {
}

export interface DeleteDifrInfoRequest {
    infoName: string;
}

export interface DeleteDifrInfoResponse {
    infoName: string;
    deleteMessage: string;
}

enum Geometry {
    bb = "BB", pb_gm = "Pb_GM"
}

enum DetectorAbsorber {
    cu01 = "CU01", cu02 = "CU02", ni01 = "NI01"
}

enum Stage {
    spinner = "SPINNER", htk1200n = "HTK1200N"
}
