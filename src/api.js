export function getData () {
    return fetch('/api/logs?_page=7&_limit=20', {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(error => error);
}
