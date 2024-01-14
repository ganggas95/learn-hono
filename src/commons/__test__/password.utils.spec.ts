import { describe, expect, it } from 'vitest';
import { checkPassword, hashPassword } from '../password.utils';

describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
        const password = 'password123';
        const hashedPassword = await hashPassword(password);

        // Expect the hashed password to be a non-empty string
        expect(typeof hashedPassword).toBe('string');
        expect(hashedPassword.length).toBeGreaterThan(0);

        // Expect the hashed password to be different from the original password
        expect(hashedPassword).not.toBe(password);
    });
});

describe('checkPassword', () => {
    it('should return true if the password matches the hash', async () => {
        const params = {
            password: 'password123',
            hash: await Bun.password.hash('password123')
        };
        const result = await checkPassword(params);
        expect(result).toBe(true);
    });

    it('should return false if the password does not match the hash', async () => {
        const params = {
            password: 'password123',
            hash: await Bun.password.hash('differentpassword')
        };
        const result = await checkPassword(params);
        expect(result).toBe(false);
    });
});