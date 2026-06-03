const inp = document.getElementById("inp");
const task = document.getElementById("task");
const btn = document.getElementById("btn");
const all = document.getElementById("all");
const comp = document.getElementById("comp");
const pan = document.getElementById("pan");
const light = document.getElementById("light")

const body = document.body;

light.addEventListener('click', () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        light.classList.remove("fa-moon");
        light.classList.add("fa-sun");
        light.classList.add("sun");
        light.classList.remove("top");
    } else {
        light.classList.remove("fa-sun");
        light.classList.add("fa-moon");
        light.classList.add("top");
        light.classList.remove("sun");
    }
});

// Gsap Animations
gsap.fromTo(".box",
  { y: -220, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, delay: 0.5 }
);

gsap.from(".top h2, .top span, .top ", {
  y: -20,
  opacity: 0,
  duration: 0.8,
  stagger: 0.4,
  delay: 1.5
});


gsap.fromTo("#inp , #btn ", 
    {y:-110 ,  opacity: 0  } ,
    {y: 0, opacity: 1, duration: 1.1, delay: 0.4 , stagger: 0.2,}
);

gsap.from(".bottom ", {
  y: 40,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  delay: 1.5
});

gsap.from("#task", {
  y: -20,
  opacity: 0,
  scale: 0.9,
  duration: 0.4,
  ease: "power2.out"
});


let filter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    task.innerHTML = "";

    tasks.forEach((t) => {

        if (filter === "completed" && !t.done) return;
        if (filter === "pending" && t.done) return;

        task.innerHTML += `
            <li class="task-item">
                <div class="left">
                    <input type="checkbox" class="check" ${t.done ? "checked" : ""}>
                    <span class="sp" style="text-decoration:${t.done ? "line-through" : "none"};opacity:${t.done ? "0.5" : "1"}">
                        ${t.text}
                    </span>
                </div>
                <div class="actions">
                    <button class="ed">Edit</button>
                    <button class="de">Delete</button>
                </div>
            </li>
        `;
    });

    saveToStorage();
}

function getIndex(el) {
    const items = [...document.querySelectorAll(".task-item")];
    return items.indexOf(el.closest(".task-item"));
}

function add() {
    if (inp.value.trim() === "") return;

    tasks.push({
        text: inp.value,
        done: false
    });

    inp.value = "";
    render();
}

btn.addEventListener("click", add);

inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") add();
});

task.addEventListener("click", (e) => {

    const item = e.target.closest(".task-item");
    if (!item) return;

    const id = getIndex(e.target);

    if (e.target.classList.contains("de")) {
        tasks.splice(id, 1);
        render();
    }

    if (e.target.classList.contains("ed")) {
        const newText = prompt("Edit task:", tasks[id].text);

        if (newText !== null && newText.trim() !== "") {
            tasks[id].text = newText;
            render();
        }
    }
});

task.addEventListener("change", (e) => {
    if (e.target.classList.contains("check")) {

        const items = [...document.querySelectorAll(".task-item")];
        const id = items.indexOf(e.target.closest(".task-item"));

        tasks[id].done = e.target.checked;
        render();
    }
});

all.addEventListener("click", () => {
    filter = "all";
    render();
});

comp.addEventListener("click", () => {
    filter = "completed";
    render();
});

pan.addEventListener("click", () => {
    filter = "pending";
    render();
});

render();