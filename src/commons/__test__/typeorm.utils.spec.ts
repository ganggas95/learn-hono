
import { EntitySchema, EntitySchemaOptions } from 'typeorm';
import { EntitySchemaOrFunction, getRepositoryToken } from "../typeorm.utils";

describe('getRepositoryToken', () => {
    it('should return the correct repository token for an instance of EntitySchema', () => {
        const entity = new EntitySchema({ target: { name: 'User' } } as EntitySchemaOptions<any>);
        const token = getRepositoryToken(entity);
        expect(token).toBe('Repository<User>');
    });
    it('should return the correct repository token for an instance of EntitySchema', () => {
        const entity = { name: 'User' } as EntitySchemaOrFunction;
        const token = getRepositoryToken(entity);
        expect(token).toBe('Repository<User>');
    });
});