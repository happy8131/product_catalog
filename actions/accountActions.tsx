'use server';

const API_SERVER_HOST = process.env.API_SERVER_HOST || 'http://localhost:8080';

export const putAccount = async (prevState: any, formData: FormData) => {
    const res = await fetch(`${API_SERVER_HOST}/api/accounts/modify`, {
        method: 'PUT',
        body: formData,
    });

    const result = await res.json();

    console.log(result);

    return { message: 'Account updated successfully', result: 'success' };
};
