const validate = (input: string, validationType: string) => {
    const value: string = input.trim();

    if (value === undefined || value === "") {
        return false;
    }

    switch (validationType) {
        case 'username': {
            const textRegex = /^[a-zA-Z0-9]+$/;
            return textRegex.test(value);
        }
        case 'email': {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(value);
        }
        case 'password': {
            const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{7,}$/;
            return passwordRegex.test(value);
        }

        case 'number': {
            return !isNaN(Number(value));
        }
        default:
            return true;
    }

}
export { validate }