const indexedDB: IDBDatabase =
    window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
  IDBTrans: IDBTransaction =
    window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
  dbVersion: number = 1;

const request: IDBRequest = indexedDB.open("images-store", dbVersion);
let db: IDBDatabase;
request.onupgradeneeded = (event: any) => {
  db = event.target.result;
  db.createObjectStore("users-store", { autoIncrement: true });
};
// Выполнить какой-то код если запрос успешный request.result работа при перезагрузке страницы
request.onsuccess = (event) => {
  db = event.target.result;
  putImageInDb(db);
  getImageFromDb(db);
};
// Сделать что-то при ошибке request.errorCode!
request.onerror = (event) => {
  alert("error opening database " + event.target.errorCode);
};

const putImageInDb = (db, image) => {
  console.log("Putting images in IndexedDB");
  const tx: IDBTransaction = db.transaction(["users-store"], IDBTrans.READ_WRITE);
  const store: IDBObjectStore = tx.objectStore("users-store");
  store.put({ image: image, username: window.localStorage.getItem("username") });
  tx.oncomplete = () => {
    console.log("stored note!");
  };
  tx.onerror = (event) => {
    alert("error storing note " + event.target.errorCode);
  };
};

const getImageFromDb = () => {
  const tx: IDBTransaction = db.transaction(["users-store"], IDBTrans.READ_ONLY);
  const store: IDBObjectStore = tx.objectStore("users-store");
  // Создаем запрос курсора
  const req: IDBRequest = store.openCursor();
  const allNotes: Array<any> = [];
  req.onsuccess = (event) => {
    const cursor: IDBCursor = event.target.result;
    if (cursor !== null) {
      allNotes.push(cursor.value);
      cursor.continue();
    } else {
      displayNotes(allNotes);
    }
  };
  req.onerror = (event) => {
    alert("error in cursor request " + event.target.errorCode);
  };
};
const displayNotes = (notes: Array<any>) => {
  const find: string = notes.reverse().find((el: any) => el.username === window.localStorage.getItem("username"));
  console.log(find);
};
