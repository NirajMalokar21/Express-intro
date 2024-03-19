const { authRegistrationController } = require('../../controllers/auth')
const User = require('../../database/schemas/User')
const helpers = require('../../utils/helpers');
const hashPassword = helpers.hashPassword;

jest.mock('../../database/schemas/User')
jest.mock('../../utils/helpers', () => ({
    hashPassword: jest.fn(() => 'hash password')
}))

const request = {
    body: {
        email: 'fake_email',
        password: 'fake_password',
    },
}

const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
}

// Stubbing is creating mock data for the system we are using
// Assertion is something we do to confirm our code is working as intended

it('should send a status code of 400 when user exists in db', async () => {
    User.findOne.mockImplementationOnce(() => ({ 
        id: 1, 
        email: "email", 
        password: "password",
    })),
    await authRegistrationController(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
})

it('should send a status code of 201 when a new user is created', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    hashPassword.mockReturnValueOnce('hash');
    await authRegistrationController(request, response)
    
})