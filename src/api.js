export function getSummary () {
    return fetch('/api/logs?_page=1&_limit=100', {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => error);
}

export function getUniqueUsers () {
    const filter = encodeURIComponent('Date=7/1/2017&' +
        'BotChannel=FacebookMsgr&' +
        'Subcategory=Intent&' +
        'Category=Store Questions');

    return fetch('/api/logs?' + filter, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => error);
}
