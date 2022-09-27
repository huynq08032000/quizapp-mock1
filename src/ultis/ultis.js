export const numInArray = (num, arr) => {
    const found = arr.find(element => element === num);
    return found ? true : false
}

export const setColor = (num, arr) => {
    if (numInArray(num, arr)) return '#25bd9396'
    return '#bdbdbd70' 
}