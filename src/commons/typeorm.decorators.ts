import { inject } from "inversify";
import { EntitySchemaOrFunction, getRepositoryToken } from "./typeorm.utils";

export const InjectRepository = (entity: EntitySchemaOrFunction): ReturnType<typeof inject> => {
    return inject(getRepositoryToken(entity));
}