const filterPhoneTitle = (title) => {
    const phoneTitleTemplate = /([а-яА-Я ]+):/g;
    const match = phoneTitleTemplate.exec(title);

    return match ? match[1].trim() : null;
}

const isWorkingDays = (content) => {

}

export { filterPhoneTitle }