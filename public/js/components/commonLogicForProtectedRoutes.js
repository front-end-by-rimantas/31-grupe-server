function commonLogic() {
    const logoutDOM = document.getElementById('logout');

    if (logoutDOM) {
        logoutDOM.addEventListener('click', () => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    location.reload();
                }
            };
            xhttp.open("DELETE", "/api/token", true);
            xhttp.send();
        })
    }
}

export { commonLogic };