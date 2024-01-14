import { mockContext } from '@/utils/unit-test.utils';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserDto } from '../dto/users.dto';
import { UsersEntity } from '../entity';
import UserController from '../users.controller';

describe("Users Controller", () => {
    const expectedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    };

    const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com'
    }

    let controller: UserController;
    const mockUserService = {
        findAll: vi.fn(),
        findById: vi.fn().mockImplementation((id: number) => {
            return Promise.resolve(expectedUser);
        }),
        create: vi.fn().mockImplementation((user: UserDto) => {
            return Promise.resolve({
                ...user,
                id: Date.now(),
            });
        }),
        delete: vi.fn().mockImplementation((id: number) => {
            return Promise.resolve();
        }),
        update: vi.fn().mockImplementation((id: number, user: UserDto) => {
            return Promise.resolve({
                ...user,
                id,
            })
        })
    };

    beforeAll(() => {
        controller = new UserController(mockUserService as any);
    })

    beforeEach(() => {
        vi.resetAllMocks;
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("should return all users", async () => {

        const users = [
            { id: 1, name: "Test", email: "test@test.com" },
            { id: 2, name: "Test2", email: "test2@test.com" }
        ] as UsersEntity[];
        vi.spyOn(mockUserService, "findAll")
            .mockResolvedValue(users);

        const result = await controller.findAll(mockContext as any);
        expect(result.data).toEqual(users);
    })

    it('should find a user by id and return a success response', async () => {
        // Arrange
        const ctx = {
            ...mockContext,
            req: {
                param: vi.fn().mockReturnValue(1)
            },
        };

        // Act
        const result = await controller.findById(ctx as any);

        // Assert
        // expect(mockUserService.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual({
            status: 200,
            data: expectedUser,
            message: 'success'
        });
    });


    it('should create a user and return a success response', async () => {
        // Arrange
        const ctx = {
            ...mockContext,
            req: {
                json: vi.fn().mockReturnValue(newUser)
            },
        };

        // Act
        const result = await controller.create(ctx as any);

        // Assert
        // expect(mockUserService.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual({
            status: 200,
            data: {
                ...newUser,
                id: expect.any(Number),
            },
            message: 'success'
        });
    });

    it("should delete a user and return a success response", async () => {
        // Arrange
        const ctx = {
            ...mockContext,
            req: {
                param: vi.fn().mockReturnValue(1)
            },
        };

        // Act
        const result = await controller.delete(ctx as any);

        // Assert
        expect(result).toEqual({
            status: 204,
            data: null,
            message: 'success'
        })
    })

    it("should update a user and return a success response", async () => {
        // Arrange
        const ctx = {
            ...mockContext,
            req: {
                param: vi.fn().mockReturnValue(1),
                json: vi.fn().mockReturnValue(newUser)
            },
        };

        // Act
        const result = await controller.update(ctx as any);

        // Assert
        expect(result).toEqual({
            status: 200,
            data: {
                ...newUser,
                id: expect.any(Number),
            },
            message: 'success'
        })
    })
})
