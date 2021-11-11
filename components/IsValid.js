class IsValid {
    static nonEmptyString(text) {
        return typeof text === 'string' && text !== '';
    }

    static nonEmptyArray(list) {
        return Array.isArray(list) && list.length > 0;
    }

    static isInteger(num) {
        return Number.isInteger(num);
    }

    static isNegativeInteger(num) {
        return IsValid.isInteger(num) && num < 0;
    }

    static isPositiveInteger(num) {
        return IsValid.isInteger(num) && num > 0;
    }

    static isNonNegativeInteger(num) {
        return IsValid.isInteger(num) && num >= 0;
    }

    static isNonPositiveInteger(num) {
        return IsValid.isInteger(num) && num <= 0;
    }

    static trueObject(obj) {
        return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
    }

    static objectKeysCount(obj, min, max = min) {
        if (!IsValid.trueObject(obj) || !IsValid.isInteger(min)) {
            return false;
        }
        if (Object.keys(obj).length < min || Object.keys(obj).length > max) {
            return false;
        }
        return true;
    }
}

module.exports = IsValid;
