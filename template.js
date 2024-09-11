function generateNoteTemplate(index) {
    return `<div class="note">
                <div>
                    <span>${notes[index].title}</span>
                    <p>${notes[index].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/archive.png" alt="archive" onclick="saveToArchive(${index})"></span>
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="saveToTrashFromNotes(${index})"></span>
                </div>
            </div>`;
}

function generateArchiveTemplate(index) {

    return `<div class="note archive">
                <div>
                    <span>${archives[index].title}</span>
                    <p>${archives[index].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="saveToTrashFromArchive(${index})"></span>
                </div>
            </div>`;
}

function generateTrashTemplate(index) {
    return `<div class="note trash">
                <div>
                    <span>${trashes[index].title}</span>
                    <p>${trashes[index].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/history.png" alt="history" onclick="restoreFromTrash(${index})"></span>
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="deleteFromTrash(${index})"></span>
                </div>
            </div>`;
}
