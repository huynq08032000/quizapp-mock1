export const numInArray = (num, arr) => {
    if (arr) {
        const found = arr?.find(element => element === num);
        return found ? true : false
    }
    return false;
}

export const setColor = (num, arr, color, color2) => {
    if (numInArray(num, arr)) return color
    return color2
}

export const colorTag = {
    user : '#87d068',
    admin : '#108ee9'
}

export const optionsRole = [
    {
        label: 'User',
        value: 'user',
    },
    {
        label: 'Admin',
        value: 'admin',
    },
];