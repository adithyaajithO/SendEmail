export const emailValidation = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};
