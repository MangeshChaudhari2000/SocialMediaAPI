import otpGenerator from 'otp-generator';

export const generateOtp = {
    generatedOtp() {
        try {
            const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false
            })
            return otp;
        } catch (error) {
            console.log(error);
        }
    }


}