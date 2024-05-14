document.addEventListener("DOMContentLoaded", function () {
    let arr = JSON.parse(localStorage.getItem("arr")) || [];

    function updateLocalStorage() {
        localStorage.setItem("arr", JSON.stringify(arr));
    }

    function addItemToList(item) {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<i class="icon"></i>${item.task}<i class="fa-solid fa-trash del"></i>`;

        document.querySelector(".items").appendChild(newLi);

        const newIndex = arr.indexOf(item);
        newLi.querySelector(".icon").addEventListener("click", () => {
            newLi.querySelector(".icon").classList.toggle("selected");
            newLi.classList.toggle("line");
            arr[newIndex].completed = !arr[newIndex].completed;
            updateLocalStorage();
        });

        newLi.querySelector(".del").addEventListener("click", () => {
            newLi.remove();
            arr.splice(newIndex, 1);
            updateLocalStorage();
        });
    }

    if (arr) {
        arr.forEach((item) => {
            addItemToList(item);
        });
    }

    const add = document.getElementById("addBtn");
    const input = document.querySelector("#text");

    function handleAdd() {
        const task = input.value.trim();
        if (task === "") {
            return;
        }
        const newItem = { task, completed: false };
        arr.push(newItem);
        addItemToList(newItem);
        input.value = "";
        updateLocalStorage();
    }

    add.addEventListener("click", handleAdd);

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    });
});
