let notes = [];
let trashes = [];
let archives = [];

function getInput() {
    let titleElement = document.getElementById('title');
    let titleValue = titleElement.value;

    if (titleValue == "") {
        document.getElementById('title-error').classList.remove('d-none');
        return;
    }

    document.getElementById('title-error').classList.add('d-none');

    let contentElement = document.getElementById('content');
    let contentValue = contentElement.value;

    if (contentValue == "") {
        document.getElementById('content-error').classList.remove('d-none');
        return;
    }

    document.getElementById('content-error').classList.add('d-none');

    saveToNotes(titleValue, contentValue);

    titleElement.value = '';
    contentElement.value = '';

    titleElement.focus();
}

function loadDataFromLocalStorage() {
    let loadArchives = localStorage.getItem("archiveNotes");

    archives = JSON.parse(loadArchives);

    if (archives == null) {
        archives = [];
    }

    render();
}


document.getElementById('title').addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        getInput();
    }
});

document.getElementById('content').addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        getInput();
    }
});

function saveToNotes(getTitle, getContent) {
    notes.push({
        title: getTitle,
        content: getContent
    });

    render();
}

function render() {
    renderNotes();
    renderArchive();
    renderTrash();
}

function renderNotes() {
    document.getElementById('notes').innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        document.getElementById('notes').innerHTML += generateNoteTemplate(i);
    }
}

function renderArchive() {
    document.getElementById('archive').innerHTML = '';

    for (let i = 0; i < archives.length; i++) {
        document.getElementById('archive').innerHTML += generateArchiveTemplate(i)
    }
}

function renderTrash() {
    document.getElementById('trash').innerHTML = '';

    for (let i = 0; i < trashes.length; i++) {
        document.getElementById('trash').innerHTML += generateTrashTemplate(i)
    }
}



function saveToArchive(index) {
    let archiveItem = notes[index];

    archives.push(archiveItem);

    localStorage.setItem('archiveNotes', JSON.stringify(archives));

    notes.splice(index, 1);

    render();
}

function saveToTrashFromNotes(index) {
    let trashItem = notes[index];

    trashes.push(trashItem);

    notes.splice(index, 1);

    render();

}

function saveToTrashFromArchive(index) {
    let trashItem = archives[index];

    trashes.push(trashItem);

    archives.splice(index, 1);

    localStorage.setItem('archiveNotes', JSON.stringify(archives));

    render();

}

function deleteFromTrash(index) {
    trashes.splice(index, 1);

    render();
}

function restoreFromTrash(index) {
    let restoreItem = trashes[index];

    notes.push(restoreItem);

    trashes.splice(index, 1);

    render();
}