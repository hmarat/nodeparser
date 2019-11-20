const filterPhoneTitle = (title) => {
    const phoneTitleTemplate = /([а-яА-Я ]+):/g;
    const match = phoneTitleTemplate.exec(title);

    return match ? match[1].trim() : null;
}

const filterPhoneNumberType = item => {
    const type = item ? item.data.trim() : null;
    const typeTemplate = /\([а-яА-Я ]+.?\)/;
    return typeTemplate.exec(type) ? type : null;
}

const isWorkingDays = (content) => {

}

export { filterPhoneTitle, filterPhoneNumberType }