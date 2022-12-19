export const getTodayDate = (): string => {
    const today = new Date();
    const iso = today.toISOString();
    return iso;
}

export const convertToLocal = (date: string): string => {
    const newDateObj = new Date(date);
    return newDateObj.toLocaleDateString();
}

export const getTodayLocal = (): string => {
    const today = getTodayDate();
    return convertToLocal(today);
}