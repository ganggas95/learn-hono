import { vi } from 'vitest';

export const mockContext = {
    json: vi.fn().mockImplementation(payload => ({
        ...payload
    }))
};