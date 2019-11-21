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
    const workingDaysTemplate = /([а-яА-Я]{2,3} ){1,7}((\d{2}:\d{2}-\d{2}:\d{2})|(К|к)руглосуточно)/;
    return workingDaysTemplate.exec(content) ? content : null;
}

const isSpanOldAddress = spanTitle => {
    return /Старое название:/.exec(spanTitle) && true;
}

export { filterPhoneTitle, filterPhoneNumberType, isWorkingDays, isSpanOldAddress }