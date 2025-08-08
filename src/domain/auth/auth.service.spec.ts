import { JwtService } from '@nestjs/jwt';

jest.mock('./users/users.service', () => ({
  UsersService: jest.fn(),
}));

import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should return user data without password', async () => {
    const usersService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, username: 'john', password: 'secret' }),
    } as any;
    const service = new AuthService(usersService, new JwtService({ secret: 'test' }));
    const result = await service.validateUser({ username: 'john', password: 'secret' });
    expect(result).toEqual({ id: 1, username: 'john' });
  });
});
