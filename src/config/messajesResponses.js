const messajes = {
    authFalse: { status: 401, data: { message: 'Auth false' } },
    emailExist: { status: 400, data: { message: 'The email exists in the database' } },
    invalidToken: { status: 401, data: { message: 'Ivalid token' } },
    invalidQuery: { status: 401, data: { message: 'Ivalid query' } },
    invalidData: { status: 401, data: { message: 'Ivalid data' } },
    isExists: { status: 401, data: { message: 'the data already exists' } },
    notFound: { status: 404, data: { message: 'Not found' } },
    noValidate: { status: 401, data: { message: 'The account must be validated' } },
    validateAccount: { status: 200, data: { message: 'Account validate' } },
    successful: { status: 200, data: { message: 'Process successful' } },
    created: { status: 201, data: { message: 'Created successful' } }
}

export default messajes
