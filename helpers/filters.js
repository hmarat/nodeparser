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

const filterOtherPhoneNumberType = type => {
    const template = /\(?([а-яА-Яa-zA-Z.]+)\)/;
    const match = type && type.match(template);
    
    return match ? match[1] : null;
}

const getWorkingDays = (content) => {
    const workingDaysTemplate = /([а-яА-Я]{2,3} ){1,7}((\d{2}:\d{2}-\d{2}:\d{2})|(К|к)руглосуточно)/g;
    const workingDaysRules = content.match(workingDaysTemplate);

    return workingDaysRules;
}

const isSpanOldAddress = spanTitle => {
    return /Старое название:/.exec(spanTitle) && true;
}

const isRegion = text => {
    const regionTemplate = /\(.+\)/g;
    const matchText = text.match(regionTemplate);

    return matchText && matchText.length && matchText[0].length === text.length;
}

const isFilialFromArcax = (regionAndCity) => {
    const arcaxRegionTemplate = /Армения, Арцах/g;

    return !!regionAndCity.match(arcaxRegionTemplate);
}

const filterOtherPhoneNumber = numberObj =>({
    number: numberObj.number[numberObj.number.length - 1] === "(" ? numberObj.number.slice(0, numberObj.number.length - 1).trim() : numberObj.number,
    type: filterOtherPhoneNumberType(numberObj.type)
})

export { filterPhoneTitle, filterPhoneNumberType, getWorkingDays, isSpanOldAddress, isRegion, isFilialFromArcax, filterOtherPhoneNumber }