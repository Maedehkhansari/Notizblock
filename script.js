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

function loadDataFromLocalStorage(){
    let loadArchives = localStorage.getItem("archiveNotes");

    archives = JSON.parse(loadArchives);

    if (archives == null){
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
    document.getElementById('notes').innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        document.getElementById('notes').innerHTML += `<div class="note">
                <div>
                    <span>${notes[i].title}</span>
                    <p>${notes[i].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/archive.png" alt="archive" onclick="saveToArchive(${i})"></span>
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="saveToTrashFromNotes(${i})"></span>
                </div>
            </div>`;
    }

    document.getElementById('archive').innerHTML = '';

    for (let i = 0; i < archives.length; i++) {
        document.getElementById('archive').innerHTML += `<div class="note archive">
                <div>
                    <span>${archives[i].title}</span>
                    <p>${archives[i].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="saveToTrashFromArchive(${i})"></span>
                </div>
            </div>`;
    }

    document.getElementById('trash').innerHTML = '';

    for (let i = 0; i < trashes.length; i++) {
        document.getElementById('trash').innerHTML += `<div class="note trash">
                <div>
                    <span>${trashes[i].title}</span>
                    <p>${trashes[i].content}</p>
                </div>
                <div class="buttons">
                    <span><img src="img/history.png" alt="history" onclick="restoreFromTrash(${i})"></span>
                    <span><img src="img/delete.png" alt="delete" class="delete" onclick="deleteFromTrash(${i})"></span>
                </div>
            </div>`;
    }
}

function saveToArchive(index){
    let archiveItem = notes[index];

    archives.push(archiveItem);

    localStorage.setItem('archiveNotes', JSON.stringify(archives));

    notes.splice(index, 1);

    render();
}

function saveToTrashFromNotes(index){
    let trashItem = notes[index];

    trashes.push(trashItem);

    notes.splice(index, 1);

    render();
    
}

function saveToTrashFromArchive(index){
    let trashItem = archives[index];

    trashes.push(trashItem);

    archives.splice(index, 1);

    localStorage.setItem('archiveNotes', JSON.stringify(archives));

    render();
    
}

function deleteFromTrash(index){
    trashes.splice(index, 1);

    render();
}

function restoreFromTrash(index) {
    let restoreItem = trashes[index];

    notes.push(restoreItem);

    trashes.splice(index, 1);

    render();
}