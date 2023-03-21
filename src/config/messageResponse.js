export const accountResponse = {
    invalidQuery: { status: 401, data: { message: 'Ivalid query, _id or email not found' } },
    notFound: { status: 404, data: { message: 'Account not found' } },
}

export const loginResponse = {
    authFalse: { status: 401, data: { message: 'Auth false' } },
    invalidToken: { status: 401, data: { message: 'Ivalid token' } },
    emailExist: { status: 400, data: { message: 'The email exists in the database' } },
    noValidate: { status: 401, data: { message: 'The account must be validated' } },
    validateAccount: { status: 200, data: { message: 'Account validate' } }
}

export const categoryResponse = {
    invalidQuery: { status: 401, data: { message: 'The query does not contain the shopId' } },
    nameExist: { status: 400, data: { message: 'The name category exists in the database' } },
    notFound: { status: 404, data: { message: 'The category not found' } }
}

export const shopResponse = {
    invalidQuery: { status: 401, data: { message: 'The query does not contain the shopId or accountId' } },
    uidExist: { status: 400, data: { message: 'The uid exists in the database' } },
    uidNotValid: { status: 400, data: { message: 'The uid parameter is invalid' } },
    notFound: { status: 404, data: { message: 'Shop not found' } }
}

export const productResponse = {
    invalidQuery: { status: 401, data: { message: 'The query does not contain the shopId' } },
    codeExist: { status: 400, data: { message: 'The code product exists in the database' } },
    notFound: { status: 404, data: { message: 'The product not found' } }
}
