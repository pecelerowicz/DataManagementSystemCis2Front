import { Node } from '../dto/my_data';

export interface TemFolderStructure {
    folderStructure: Node;
    canRead: boolean;
    canDownload: boolean;
    canModifyContent: boolean;
    canModifyAuthorities: boolean;
}