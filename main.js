const books = [];


// document.addEventListener(RENDER_EVENT, function () {
//     const uncompletedTODOList = document.getElementById('todos');
//     uncompletedTODOList.innerHTML = '';

//     const completedTODOList = document.getElementById('completed-todos');
//     completedTODOList.innerHTML='';

//     for (const todoItem of todos) {
//         const todoElement = makeTodo(todoItem);
//         if (!todoItem.isCompleted)
//             uncompletedTODOList.append(todoElement); 
//         else 
//             completedTODOList.append(todoElement);
//     }
// });

function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.bookTitle;
    bookTitle.setAttribute('data-testid', 'bookItemTitle');

    const bookAuthor = document.createElement('p')
    bookAuthor.innerText = `Penulis: ${bookObject.bookAuthor}`;
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');

    const bookYear = document.createElement('p');
    bookYear.innerText = `Tahun: ${bookObject.bookYear}`;

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid','bookItemDeleteButton');
    deleteButton.innerText = 'Hapus Buku';

    const editButton = document.createElement('button');
    editButton.setAttribute('data-testid','bookItemEditButton');
    editButton.innerText = 'Edit Buku';


    const container = document.createElement('div');
    container.setAttribute('data-bookid', 'bookObject.bookId');
    container.setAttribute('data-testid', 'bookItem');

    container.append(bookTitle,bookAuthor,bookYear);

    if (bookObject.isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.innerText = 'Belum Selesai Dibaca'

        completeButton.addEventListener('click', function () {
            //TODO: ganti supaya bisa toggle between complete and incomplete
            // undoBookFromCompleted(todoObject.id);
        });

        const buttonList = document.createElement('div');
        buttonList.append(completeButton, deleteButton, editButton);
        container.append(buttonList);

    } else {
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.innerText = 'Selesai Dibaca'

        completeButton.addEventListener('click', function () {
            //TODO: ganti supaya bisa toggle between complete and incomplete
            // addBookToCompleted(todoObject.id);
        });

        const buttonList = document.createElement('div');
        buttonList.append(completeButton, deleteButton, editButton);
        container.append(buttonList);
    }

    return container;
}

function generateBookObject(bookId, bookTitle, bookAuthor, bookYear, isCompleted) {
    return {
        bookId,
        bookTitle,
        bookAuthor,
        bookYear,
        isCompleted,
    };
}

function generateId() {
    return +new Date();
}

function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const completed = document.getElementById('bookFormIsComplete').checked;

    const generatedId = generateId();
    const bookObject = generateBookObject(generatedId, title, author, year, completed);

    books.push(bookObject);
    // document.dispatchEvent(new Event(RENDER_EVENT));
    // saveData();
}

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function updateStatusOnSubmitButtonText(bookIsCompleteCheckbox) {
    if (bookIsCompleteCheckbox.checked) {
        document.getElementById('statusOnSubmitButtonText').innerText = "Selesai dibaca"
    } else document.getElementById('statusOnSubmitButtonText').innerText = "Belum selesai dibaca"
}