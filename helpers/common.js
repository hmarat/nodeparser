const arrayFromLength = number => Array.from(new Array(number).keys()).map(k => k + 1);

const getListInfoType = (className, text) => {
    if (className === "mhd") {
        switch (text.trim()) {
            case "Руководитель": return "supervisor";
            case "Адрес, телефон": return "addressPhone";
            case "Другие средства связи": return "otherPhoneContacts";
            case "Эл. почта": return "email";
            case "Сайт": return "webSite";
            default: return null;
        }
    }
    return "content";
}

export { arrayFromLength, getListInfoType };