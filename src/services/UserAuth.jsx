import axios from 'axios';

const base_API_URL = 'https://philosophical-amity-mgcenter-8000e7e0.koyeb.app';

export async function userSignUp(formUserData) {
    try {
        const userdata = Object.fromEntries(
            Object.entries(formUserData)
                  .filter(([key, value]) => value !== null)
        );
        const response = await axios.post(base_API_URL + '/api/user/register/', userdata, { headers: { 'Content-Type': 'application/json' } });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error in userSignUp:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function userSignIn(formUserData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/login/', formUserData, { headers: { 'Content-Type': 'application/json' } });
        return response;
    } catch (error) {
        console.error('Error in userSignIn:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function userSignOut(userToken) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/logout/', { refresh: userToken.refresh },
            { headers: { 'Authorization': 'Bearer ' + userToken.access, 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in userSignOut:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function passwordReset(userToken, newPasswordData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/password-reset/', {
            old_password: newPasswordData.old_password,
            new_password: newPasswordData.new_password,
            confirm_new_password: newPasswordData.confirm_new_password
        }, { headers: { 'Authorization': 'Bearer ' + userToken.access, 'Content-Type': 'application/json' } });

        return response;
    } catch (error) {
        console.error('Error in passwordReset:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function updateProfileData(userToken, newData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/activation-code/', {
            first_name: newData.first_name,
            last_name: newData.last_name,
            picture: newData.picture
        }, { headers: { 'Authorization': 'Bearer ' + userToken.access, 'Content-Type': 'application/json' } });

        return response;
    } catch (error) {
        console.error('Error in updateProfileData:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function getProfileData(userToken) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/profile/',
            { headers: { 'Authorization': 'Bearer ' + userToken.access, 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in getProfileData:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function sendActivationCode(email, activation_code) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/activation-code/',
            { email: email, activation_code: parseInt(activation_code, 10) },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in sendActivationCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function resendActivationCode(email) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/activation-code/', { params: { 'email': email } },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in resendActivationCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}


export async function getForgottenPasswordCode(email) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/forget-password/', { params: { 'email': email } },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in getForgotPasswordCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}
