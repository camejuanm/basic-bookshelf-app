const books = [];
const RENDER_EVENT = 'render-bookshelf';
const STORAGE_KEY = 'BOOKSHELF';

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.getElementById('incompleteBookList');
    incompleteBookList.innerHTML = '';

    const completeBookList = document.getElementById('completeBookList');
    completeBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete)
            incompleteBookList.append(bookElement);
        else
            completeBookList.append(bookElement);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;
    bookTitle.setAttribute('data-testid', 'bookItemTitle');

    const bookAuthor = document.createElement('p')
    bookAuthor.innerText = `Penulis: ${bookObject.author}`;
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');

    const bookYear = document.createElement('p');
    bookYear.innerText = `Tahun: ${bookObject.year}`;

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.innerText = 'Hapus Buku';

    const editButton = document.createElement('button');
    editButton.setAttribute('data-testid', 'bookItemEditButton');
    editButton.innerText = 'Edit Buku';

    const container = document.createElement('div');
    container.setAttribute('data-bookid', bookObject.id);
    container.setAttribute('data-testid', 'bookItem');

    container.append(bookTitle, bookAuthor, bookYear);

    deleteButton.addEventListener('click', function () {
        deleteBook(bookObject.id);
    })

    if (bookObject.isComplete) {
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.innerText = 'Belum Selesai Dibaca'

        completeButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        const buttonList = document.createElement('div');
        buttonList.append(completeButton, deleteButton, editButton);
        container.append(buttonList);

    } else {
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.innerText = 'Selesai Dibaca'

        completeButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        const buttonList = document.createElement('div');
        buttonList.append(completeButton, deleteButton, editButton);
        container.append(buttonList);
    }

    return container;
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    };
}

function generateId() {
    return +new Date();
}

function isStorageExist() {
    if (typeof (Storage) == undefined) {
        alert('Browser tidak support storage');
        return false;
    } else return true
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data != null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}
function saveData() {
    if (isStorageExist) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    };
}

function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const completed = document.getElementById('bookFormIsComplete').checked;

    const generatedId = generateId();
    const bookObject = generateBookObject(generatedId, title, author, year, completed);

    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function addBookToCompleted(bookId) {
    const targetIndex = findBookIndex(bookId);
    if (targetIndex == -1) return;

    books[targetIndex].isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(bookId) {
    const targetIndex = findBookIndex(bookId);
    if (targetIndex == -1) return;

    books[targetIndex].isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId) {
    const targetIndex = findBookIndex(bookId);
    if (targetIndex == -1) return;
    books.splice(targetIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function updateStatusOnSubmitButtonText(bookIsCompleteCheckbox) {
    if (bookIsCompleteCheckbox.checked) {
        document.getElementById('statusOnSubmitButtonText').innerText = "Selesai dibaca"
    } else document.getElementById('statusOnSubmitButtonText').innerText = "Belum selesai dibaca"
}