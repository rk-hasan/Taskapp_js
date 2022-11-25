const form = document.querySelector('#myform');
const addTask = document.querySelector('#addTask');
const fiter = document.querySelector('#fiter');
const list = document.querySelector('#list');
const sms = document.querySelector('#sms');
const clearBtn = document.querySelector('#clearBtn');

// EventListener

form.addEventListener('submit', addtask);
list.addEventListener('click', delTask);
clearBtn.addEventListener('click', clearTask);
fiter.addEventListener('keyup', filterData);
document.addEventListener('DOMContentLoaded', fetchData);

// Add Task Function

function addtask(e){
    e.preventDefault();
    if(addTask.value === ''){
        alert('Sorry Task Feild Is Empty');
    }else{
        let lists = document.createElement('li');
        lists.appendChild(document.createTextNode(addTask.value + ' '));
        list.appendChild(lists);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Delete X';
        link.style.color = 'red';
        lists.appendChild(link);

        // Local Store Function
        storeTaskInLocalStore(addTask.value);

        addTask.value = '';
    }
}

// Task Delete Function

function delTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are You Sure')){
            let elem = e.target.parentElement;
            elem.remove();
            removeFormLstr(elem);
        }
    }
}

// Clear Task Function 

function clearTask(){
    if(confirm('Are You Sure To Clear Task'))
    {
        // list.innerHTML = '';
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }

        localStorage.clear();
    }
}

// Data filtering

function filterData(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){

            task.style.display = 'block';
            sms.textContent = 'Data Found';
        }else{
            task.style.display = 'none';
            sms.textContent = 'Sorry Data Not Found!';
        }
    });
}

// Storage In Local

function storeTaskInLocalStore(task){
    let listData;

    if(localStorage.getItem('listData') === null){
        listData = [];
    }else{
        listData = JSON.parse(localStorage.getItem('listData'));
    }
    listData.push(task);

    localStorage.setItem('listData', JSON.stringify(listData));
}


// Fetch Data From Local Storage

function fetchData(){
    let listData;

    if(localStorage.getItem('listData') === null){
        listData = [];
    }else{
        listData = JSON.parse(localStorage.getItem('listData'));
    }

    listData.forEach(data => {
        let lists = document.createElement('li');
        lists.appendChild(document.createTextNode(data + ' '));
        list.appendChild(lists);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Delete X';
        link.style.color = 'red';
        lists.appendChild(link);
    })
}

// Data Delete From LocalStore

function removeFormLstr(taskItem){
    let listData;

    if(localStorage.getItem('listData') === null){
        listData = [];
    }else{
        listData = JSON.parse(localStorage.getItem('listData'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); //remove a

    listData.forEach((task, index) =>{
        if(li.textContent.trim() === task){
            listData.splice(index, 1);
        }
    });

    localStorage.setItem('listData', JSON.stringify(listData));
}
