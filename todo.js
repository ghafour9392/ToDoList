let list = document.querySelectorAll(".list");
const inputTitle = document.querySelector(".input-title");
const inputDescription = document.querySelector(".input-description");
const btnSave = document.querySelector(".save");
const listToDo = document.querySelector(".listtodo");
const btnEdit = document.querySelectorAll(".fa-pen-to-square");
const backdrop = document.querySelector(".backdrop");
const clearAll = document.querySelector(".footer .clearAll");

const modalDelete = document.querySelector(".modalDelete");
const cancelDeleteBtn = document.querySelector(".modalDelete .cancelDelete");
const titleModalDelete = document.querySelector(".modalDelete .titleModal");
const deleteBtn = document.querySelector(".modalDelete .delete");

const total = document.querySelector(".total");
const success = document.querySelector(".success");
const pending = document.querySelector(".pending");

const searchBox = document.querySelector(".search input");
searchBox.value = "";

const selecetBox = document.querySelector(".sort select");
selecetBox.value = "default";

let id = 0;
let todo = [];
let idEditDelete = "";
let arrSearch = [];

// const aMinuteAgo = new Date();
// const bMinuteAgo = new Date( Date.now() - 1000 * 120 );
// const aMinuteAgo = datePersian()
// const bMinuteAgo = datePersian();
// console.log(aMinuteAgo);
// console.log(bMinuteAgo);
// console.log(aMinuteAgo-bMinuteAgo);
let dateUp = [];

//events
btnSave.addEventListener("click", add);

listToDo.addEventListener("click", events);

clearAll.addEventListener("click", () => {
  todo = [];
  arrSearch = [];
  listToDo.innerHTML = `
    <p class="NoDate">There is no data</p>
  `;
});

searchBox.addEventListener("input", (e) => {
  arrSearch = todo.filter((el) => el.title.includes(e.target.value));
  // console.log(arrSearch);
  show(arrSearch);
});

selecetBox.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "default":
      if (searchBox.value === "") sortAscending(todo, "Id");
      else sortAscending(arrSearch, "Id");
      break;
    case "nameUp":
      if (searchBox.value === "") {
        sortAscending(todo, "title");
      } else sortAscending(arrSearch, "title");
      break;
    case "nameDown":
      if (searchBox.value === "") {
        sortDescending(todo, "title");
      } else sortDescending(arrSearch, "title");
      break;
    case "dateUp":
      if (searchBox.value === "") {
        sortAscending(todo, "date");
      } else sortAscending(arrSearch, "date");
      break;
    case "dateDown":
      if (searchBox.value === "") {
        sortDescending(todo, "date");
      } else sortDescending(arrSearch, "date");
      break;
  }
});

//modal delete
cancelDeleteBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
  modalDelete.style = "z-index: -1; transform: translateY(-100vh);";
});
backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
  modalDelete.style = "z-index: -1; transform: translateY(-100vh);";
});
deleteBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
  modalDelete.style = "z-index: -1; transform: translateY(-100vh);";
  const index = todo.findIndex((el) => {
    return el.Id === parseInt(idEditDelete);
  });
  todo.splice(index, 1);
  show(todo);
  if (todo.length === 0) {
    listToDo.innerHTML = `
      <p class="NoDate">There is no data</p>
    `;
  }
  searchBox.value = "";
});

// functions
function add(e) {
  e.preventDefault();
  if (btnSave.textContent === "SAVE") {
    if (inputTitle.value != "" && inputDescription.value != "") {
      id++;
      const d = new Date().toLocaleTimeString("fa");
      const arr = [
        {
          Id: id,
          title: inputTitle.value,
          description: inputDescription.value,
          // date: d.substring(4, 10) + " | " + d.substring(16, 21),
          date: datePersian(),
          isCompeleted: false,
          dateUpdate: "",
        },
      ];
      todo.push(...arr);
      // console.log(todo);
      show(todo);
    } else {
      alert("title text and description text must be fill");
    }
  }
  if (btnSave.textContent === "EDIT") {
    if (inputTitle.value != "" && inputDescription.value != "") {
      const d = new Date().toString();
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].Id === parseInt(idEditDelete)) {
          todo[i].title = inputTitle.value;
          todo[i].description = inputDescription.value;
          todo[i].dateUpdate = datePersian();
        }
      }
      show(todo);
      inputTitle.classList.remove("input-title-edit");
      inputDescription.classList.remove("input-description-edit");
      btnSave.classList.remove("save-edit");
      btnSave.innerText = "SAVE";
    } else {
      alert("title text and description text must be fill");
    }
  }
  inputTitle.value = "";
  inputDescription.value = "";
  inputTitle.focus();
  selecetBox.value = "default";
  searchBox.value = "";
}
// function show() {
//   listToDo.innerHTML = "";
//   for (let i = 0; i < todo.length; i++) {
//     if (todo[i].dateUpdate === "") {
//       listToDo.innerHTML += `
//       <div class="list" data-id="${todo[i].Id}">
//         <div class="todo">
//           <p class="title-task">${todo[i].title}</p>
//           <p class="date-task">${todo[i].date}</p>
//           <div class="btn-task">
//             <i class="fa-regular fa-square-check"></i>
//             <i class="fa-solid fa-pen-to-square"></i>
//             <i class="fa-regular fa-trash-can"></i>
//           </div>
//         </div>
//         <div class="description-task">
//           <p>${todo[i].description}</p>
//         </div>
//       </div>`;
//     } else {
//       listToDo.innerHTML += `
//       <div class="list" data-id="${todo[i].Id}">
//         <div class="todo">
//           <p class="title-task">${todo[i].title}</p>
//           <p class="date-task">
//             ${todo[i].date}
//           </p>
//           <div class="btn-task">
//             <i class="fa-regular fa-square-check"></i>
//             <i class="fa-solid fa-pen-to-square"></i>
//             <i class="fa-regular fa-trash-can"></i>
//           </div>
//         </div>
//         <div class="description-task">
//           <p>
//           ${todo[i].description}
//           </p>
//           <span class="update">
//             <span class="u2">${todo[i].dateUpdate}</span>
//             <span class="u1">:Updated on</span>

//           </span>
//         </div>
//       </div>`;
//     }
//   }

//   // <br>
//   // <span>updated : ${todo[i].dateUpdate}</span>
//   list = document.querySelectorAll(".list");
//   desc();
//   totalTsak();
// }
function desc() {
  list.forEach((el) => {
    el.addEventListener("click", (e) => {
      const classList = [...e.target.classList];
      if (
        classList[0] === "title-task" ||
        classList[0] === "date-task" ||
        classList[0] === "description-task"
      ) {
        e.target.parentElement.parentElement.classList.toggle("expanded");
      } else if (classList[0] === "todo") {
        e.target.parentElement.classList.toggle("expanded");
      }
    });
  });
}
function events(e) {
  const classList = [...e.target.classList];
  // console.log(e.target);
  if (classList[1] === "fa-pen-to-square") {
    idEditDelete =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    // console.log(todo);
    const a = todo.filter((e) => {
      return e.Id === parseInt(idEditDelete);
    });
    // console.log(a);
    inputTitle.value = a[0].title;
    inputDescription.value = a[0].description;
    btnSave.innerText = "EDIT";
    inputTitle.classList.add("input-title-edit");
    inputDescription.classList.add("input-description-edit");
    btnSave.classList.add("save-edit");
    window.scrollTo({ top: 80, behavior: "smooth" });
  }
  if (classList[1] === "fa-trash-can") {
    // console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
    idEditDelete =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    const element = todo.filter((e) => {
      return e.Id === parseInt(idEditDelete);
    });
    titleModalDelete.textContent = `آیا از حذف ${element[0].title} اطمینان دارید؟`;
    backdrop.style.display = "block";
    modalDelete.style = "z-index: 11; transform: translateY(0vh);";
  }
  if (classList[1] === "fa-square-check") {
    const element = e.target.parentElement.parentElement.parentElement;
    const cl = [...element.classList];
    if (cl[1] === "completed") {
      idEditDelete = element.dataset.id;
      element.classList.remove("completed");
      // console.log(todo);
      todo.filter((e) => {
        if (e.Id === parseInt(idEditDelete)) {
          e.isCompeleted = false;
        }
      });
      totalTsak();
    } else {
      idEditDelete = element.dataset.id;
      element.classList.add("completed");
      todo.filter((e) => {
        if (e.Id === parseInt(idEditDelete)) {
          e.isCompeleted = true;
        }
      });
      // show();
      totalTsak();
    }
  }
}
function totalTsak() {
  const totalNumbers = todo.length;
  total.innerText = `TOTAL: ${totalNumbers}`;
  const successNumbers = todo.filter((e) => {
    return e.isCompeleted === true;
  });
  success.innerText = `SUCCESS: ${successNumbers.length}`;
  pending.innerText = `PENDING: ${totalNumbers - successNumbers.length}`;
}
function datePersian() {
  // const dd = new Date();
  // console.log(dd.toLocaleDateString("fa"));
  const today = new Date().toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  // const t = today.replace(/([۰-۹])/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  // console.log(today.substring(0,today.length-5));
  // console.log(t);
  // const d = new Date().toLocaleTimeString("fa");
  const time = new Date().toTimeString().substring(0, 8);
  // console.log(d.substring(0, 5));
  // return t.substring(0, t.length - 5) + " | " + d.substring(0, 5);
  return today + "|" + time;
}

function show(arr) {
  listToDo.innerHTML = ``;
  dateUp = [];
  for (let i = 0; i < arr.length; i++) {
    const dateFarsi =
      new Date(arr[i].date.replace("|", " ")).toLocaleDateString("fa", {
        // year: "numeric",
        month: "short",
        day: "2-digit",
      }) +
      " | " +
      arr[i].date.split("|")[1].substring(0,5);
    if (arr[i].dateUpdate === "") {
      listToDo.innerHTML += `
      <div class="list" data-id="${arr[i].Id}">
        <div class="todo">
          <p class="title-task">${arr[i].title}</p>
          <p class="date-task">${dateFarsi}</p>
          <div class="btn-task">
            <i class="fa-regular fa-square-check"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
          </div>
        </div>
        <div class="description-task">
          <p>${arr[i].description}</p>
        </div>
      </div>`;
    } else {
      const dateUpdateFarsi =
        new Date(arr[i].dateUpdate.replace("|", " ")).toLocaleDateString("fa", {
          // year: "numeric",
          month: "short",
          day: "2-digit",
        }) +
        " | " +
        arr[i].dateUpdate.split("|")[1].substring(0,5);

      dateUp.push({ id: arr[i].Id, date: arr[i].dateUpdate });
      // console.log(arr[i].Id, dateUp);
      listToDo.innerHTML += `
      <div class="list" data-id="${arr[i].Id}">
        <div class="todo">
          <p class="title-task">${arr[i].title}</p>
          <p class="date-task">
            ${dateFarsi}
          </p>
          <div class="btn-task">
            <i class="fa-regular fa-square-check"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
          </div>
        </div>
        <div class="description-task">
          <p>
          ${arr[i].description}
          </p>
          <span class="update">
            <span class="u1">Updated on: </span> 
            <span class="u2" id="up${arr[i].Id}"></span>
            
          </span>
        </div>
      </div>`;
      // console.log(dateUp);
      s();
    }
  }
  list = document.querySelectorAll(".list");
  desc();
  totalTsak();
}

function sortAscending(array, property) {
  array.sort(function (a, b) {
    let x = a[property];
    // console.log(x);
    let y = b[property];
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  });
  show(array);
}
function sortDescending(array, property) {
  array.sort(function (a, b) {
    let x = a[property];
    let y = b[property];
    if (x > y) return -1;
    if (x < y) return 1;
    return 0;
  });
  show(array);
}

function s() {
  // const datenew = new Date(dateTime.replace("|", " "));
  for (let i = 1; i <= dateUp.length; i++) {
    const datenew = new Date(dateUp[i - 1]["date"].replace("|", " "));
    const date2 = new Date();
    // console.log(date1);
    // console.log(date2);
    // console.log(datenew);
    const d = (date2 - datenew) / 1000;
    // const d = 1000000;
    // console.log(d);
    // console.log(e);
    // p.innerHTML = d + " " + Math.floor(d);
    // console.log(i);
    // console.log("asdasd",dateUp);
    if (d < 60)
      document.querySelector("#up" + dateUp[i - 1]["id"]).innerText =
        " A few seconds ago";
    else if (d > 60 && d < 3600)
      document.querySelector("#up" + dateUp[i - 1]["id"]).innerText =
        Math.floor(d / 60) + " Minutes ago";
    else if (d > 3600 && d < 86400)
      document.querySelector("#up" + dateUp[i - 1]["id"]).innerText =
        Math.floor(d / 3600) + " Hours ago";
    else{
      const dateFarsi =
      new Date(dateUp[i - 1]["date"].replace("|", " ")).toLocaleDateString("fa", {
        // year: "numeric",
        month: "short",
        day: "2-digit",
      }) +
      " | " +
      dateUp[i - 1]["date"].split("|")[1].substring(0,5);
      document.querySelector("#up" + dateUp[i - 1]["id"]).innerText = dateFarsi;
    } 
    // window.location.reload(1);
  }

  setTimeout(s, 60000);
}
