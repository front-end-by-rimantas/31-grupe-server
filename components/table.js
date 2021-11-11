function table(data) {
    const formatText = (text) => {
        if (text.length < 15) {
            return text;
        }
        return text.slice(0, 10) + '...';
    }

    let contentHTML = '';
    for (const item of data) {
        contentHTML += `<div class="table-row">
                            <div>${item.id}</div>
                            <div>${formatText(item.text)}</div>
                            <div>${item.status}</div>
                            <div>
                                <button type="button" data-action="update" data-id="${item.id}">Update</button>
                                <button type="button" data-action="delete" data-id="${item.id}">Delete</button>
                            </div>
                        </div>`;
    }

    return `<div class="table">
                <div class="table-head">
                    <div>ID</div>
                    <div>Text</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
                <div class="table-content">${contentHTML}</div>
            </div>`;
}

module.exports = table;