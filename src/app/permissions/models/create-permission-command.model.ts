import { TranslationInput  } from "../../shared/models/translation-input.model";
import { PermissionAction } from "../../shared/types/permission.type";

export interface CreatePermissionCommand {
  code: string;
  permissionAction: PermissionAction;
  parentId: number | null;
  translations: TranslationInput [];
}
