import { createContext, useContext, useState, useEffect } from 'react';
import {userSignUp, userSignIn, userSignOut, updateProfileData, sendActivationCode, getProfileData, resendActivationCode} from './services/UserAuth'
import { passwordReset } from './services/UserAuth';
export const UserDataContext = createContext(null);

export function UserAuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null);
    const [tempNewSignupData, settempNewSignupData] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        const storedData = localStorage.getItem('userData');
        const tempNewSignupData = localStorage.getItem('tempNewSignupData');

        if (storedToken && storedToken != 'undefined') {
            setUserToken(JSON.parse(storedToken));
        }

        if (storedData && storedData != 'undefined') {
            setUserData(JSON.parse(storedData));
        }

        
        if (tempNewSignupData && tempNewSignupData != 'undefined') {
            settempNewSignupData(JSON.parse(tempNewSignupData));
        }

        setLoading(false);


    }, []);

    function storeToken(token) {
        if (token === null) {
            localStorage.removeItem('userToken');
        } else {
            localStorage.setItem('userToken', JSON.stringify(token));
        }
        setUserToken(token);
    }
    

    function storeUserData(userData) {        
        if (userData === null) {
            localStorage.removeItem('userData');
        } else {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        setUserData(userData);
    }
    

    function storetempNewSignupData(tempNewSignupData) {
        if (tempNewSignupData === null) {
            localStorage.removeItem('tempNewSignupData');
        } else {
            localStorage.setItem('tempNewSignupData', JSON.stringify(tempNewSignupData));
        }
        
        settempNewSignupData(tempNewSignupData);
    }
    
    const handleSignUp = async (credentials) => {
        let result = {success: false}
        const response = await userSignUp(credentials);
        const responseData = response.data
        if (responseData.success){
            storetempNewSignupData(response.data)
            result.success = true;
        } else{
            if (responseData.email[0] == "user with this email already exists."){
                result.errorMessage = "This email is already registered. Please Sign in.";
            }
        }
        return result;
    };

    const handleLogin = async (credentials) => {

        let result = {success: false}
        const response_1 = await userSignIn(credentials);
        const responseData_1 = response_1.data
        const response_2 = await getProfileData(responseData_1)
        const responseData_2 = response_2.data
        if (responseData_1.success && responseData_2.success){
            let token = {access: responseData_1.access, refresh: responseData_1.refresh}
            storeToken(token)
            storeUserData(responseData_2.profile_details)
            result.success = true;
        } else{
            if (responseData_2.detail == ["Given token not valid for any token type"]){
                result.errorMessage = "There was a problem. Please try again";
            }
            if (responseData_1.non_field_errors == ["Invalid login credentials"]){
                result.errorMessage = "Invalid email or password";
            }
            if (responseData_1.detail == ["No active account found with the given credentials"]){
                result.errorMessage = "Activation needed";
            }
        }
        return result;
    };

    const handleLogout = async () => {
        const response = await userSignOut(userToken);
        if (response.data.success){
            storeToken()
            storeUserData()
        }
        return response;
    };

    const handleResetPassword = async (newPasswordData) => {
        const {response} = await passwordReset(userToken, newPasswordData);
        if (response.data.success){
            storeUserData(response.data.profile_details)
        }
        return response;
    };

    const handleProfileDataUpdate = async (newData) => {
        const {response} = await updateProfileData(userToken, newData);
        if (response.data.success){
            storeUserData(response)
        }
        return response;
    };

    const handleSendActivation = async ({activationCode, email}) => {
        let result = {success: false}
        const response = await sendActivationCode(email, activationCode);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            storetempNewSignupData(null)
        } else{
            if (responseData.message == "account already activated"){
                result.errorMessage = "Account is already activated.";
            }
            if (responseData.message == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
            if (responseData.message == ["Invalid activation_code"]){
                result.errorMessage = "Invalid activation code. Please try again."
            }
        }
        return result;
    };

    const handleResendActivation = async (email) => {
        let result = {success: false}
        const response = await resendActivationCode(email);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
        } else{
            console.log(responseData)
            if (responseData.message == "account already activated"){
                result.errorMessage = "Account is already activated.";
            }
            if (responseData[0] == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
        }
        return result;
    }

    const handleGetForgottenPasswordCode = async (email) => {
        let result = {success: false}
        const response = await getForgottenPasswordCode(email);
        const responseData = response.data
        if (responseData.password_reset_code_success){
            result.success = true;
        } else{
            console.log(responseData)
            if (responseData[0] == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
        }
        return result;
    }


    return (
        <UserDataContext.Provider value={{loading, userToken, userData, tempNewSignupData, handleSignUp, handleLogin, handleLogout, handleResetPassword, handleProfileDataUpdate, handleSendActivation, handleResendActivation, handleGetForgottenPasswordCode }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useAuth() {
    return useContext(UserDataContext);
}
