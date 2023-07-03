export class Validator {
    static isEmail(email: string): boolean {
        if(!email.includes('@') || !email.includes('.') || (email.indexOf('@') > email.lastIndexOf('.'))) {
            return false;
        }
        return true;
    };

    static isPhone(phone: string): boolean {
        if(phone.length !== 10) {
            return false;
        }

        for(let char of phone) {
            if(char > '9' || char < '0') {
                return false;
            }
        }
        return true;
    }

    static isStrongPassword(password: string): boolean {
        if(password.length < 6) {
            return false;
        }
        // index 0 = Uppercase
        // index 1 = lowercase
        // index 2 = Special characters like '@', '#', '$'
        const check = [false, false, false];

        for(let char of password) {
            if(!check[0] && char >= 'A' && char <= 'Z') {
                check[0] = true;
            }

            if(!check[1] && char >= 'a' && char <= 'z') {
                check[1] = true;
            }

            if(!check[2] && (char === '@' || char === '#' || char === '$')) {
                check[2] = true;
            }

            if( check[0] && check[1] && check[2]) {
                return true;
            }
        }
        return false;
    }
}