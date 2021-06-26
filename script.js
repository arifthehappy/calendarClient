let nav = 0;
let clicked = null;
let schedule = localStorage.getItem('schedule') ? JSON.parse(localStorage.getItem('schedule')):[];

const calendar = document.getElementById('calendar');
const newClassModal = document.getElementById('newClassModal');
const deleteClassModal = document.getElementById('deleteClassModal');
const backDrop = document.getElementById('modalBackDrop');
const batchTitleInput = document.getElementById('batchTitleInput');
const batchDateInput = document.getElementById('batchDateInput');
const batchStartTime = document.getElementById('batchStartTimeInput');
const batchEndTime = document.getElementById('batchEndTimeInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const scheduleToday = document.getElementById('scheduleToday');
const batch = document.getElementsByClassName('schedule');

let selectBatch = document.createElement('div');


function openModal(date){
    clicked = date;
    const scheduleForDay = schedule.find(e => e.date === clicked);
    scheduleToday.innerHTML = '';
    if(scheduleForDay){
        schedule.filter(e => e.date === clicked).forEach(element => {
        const scheduleDiv = document.createElement('div');
        const scheduleTitle = document.createElement('h3');
        const scheduleFaculty = document.createElement('h4');
        const scheduleTime = document.createElement('p');
        const scheduleDate = document.createElement('p');
        scheduleDiv.classList.add('schedule');
        scheduleDate.innerText = element.date;
        scheduleTitle.innerText = element.title;
        scheduleFaculty.innerText = element.faculty;
        scheduleTime.innerText = element.startTime +" - " + element.endTime;
        // daySquare.appendChild(scheduleDiv);
        scheduleDiv.innerHTML += scheduleDate.outerHTML + scheduleTitle.outerHTML + scheduleFaculty.outerHTML + scheduleTime.outerHTML;
        scheduleToday.appendChild(scheduleDiv,scheduleToday.childNodes[2]);

        // selectBatch.appendChild(scheduleDiv,selectBatch.childNodes[1])

        // console.log(scheduleDiv.outerHTML)

        })
        
        batchDateInput.value = clicked;
        newClassModal.style.display = 'block';


        // document.getElementById('classText').innerText = scheduleForDay.title;
        // document.getElementById('classFaculty').innerText = scheduleForDay.faculty;
        // document.getElementById('classStartTime').innerText = scheduleForDay.startTime + '-';
        // document.getElementById('classEndTime').innerText = scheduleForDay.endTime;

        // deleteClassModal.style.display = 'block';
    }else{        
        var blankNode = document.createElement('div')
        // scheduleToday.replaceChild(blankNode,scheduleToday.childNodes[0]);
        batchDateInput.value = clicked;
        newClassModal.style.display = 'block';
        backDrop.style.display = 'block';
    }

    
}

function batchOpenModal() {

    document.getElementById('classDate').innerText = selectBatch.date;
    document.getElementById('classFaculty').innerText = selectBatch.faculty;
    document.getElementById('classTime').innerText = selectBatch.time;
    // document.getElementById('classEndTime').innerText = scheduleForDay.endTime;
    deleteClassModal.style.display = 'block';

}


function load() {
    const dt = new Date();

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    let mMonth = month + 1;
    if(mMonth < 10){mMonth = '0' + mMonth};
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month ,1);
    const daysInMonth = new Date(year,month +1 ,0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us',{month:'long'})} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        
        const dayString =  `${year}-${mMonth}-${i - paddingDays}`;
        
        if(i > paddingDays){
            daySquare.innerText = i -paddingDays;
            const scheduleForDay = schedule.find(e => e.date === dayString);

            if(i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';
            }

            if(scheduleForDay){
                // const scheduleDiv = document.createElement('div');
                // const scheduleTitle = document.createElement('h3');
                // const scheduleFaculty = document.createElement('h4');
                // const scheduleTime = document.createElement('p');
                const scheduleHint = document.createElement('p');
                // const scheduleDate = document.createElement('p');
                scheduleHint.classList.add('scheduleHint')
                // scheduleDiv.classList.add('schedule');
                // scheduleDate.innerText = scheduleForDay.date;
                // scheduleTitle.innerText = scheduleForDay.title;
                // scheduleFaculty.innerText = scheduleForDay.faculty;
                // scheduleTime.innerText = scheduleForDay.startTime +" - " + scheduleForDay.endTime;
                // // daySquare.appendChild(scheduleDiv);
                // scheduleDiv.innerHTML += scheduleDate.outerHTML + scheduleTitle.outerHTML + scheduleFaculty.outerHTML + scheduleTime.outerHTML;
                daySquare.appendChild(scheduleHint);
                // scheduleForToday.innerHTML = scheduleDiv.innerHTML;
                //scheduleToday.appendChild(scheduleDiv);
            }

            daySquare.addEventListener('click',()=> openModal(dayString));

        }else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }


    // console.log(selectBatch.outerHTML)
    // console.log(batch)
    // console.log(batch.length)
    // batch[0].addEventListener('click',()=> console.log('click'));

    for(let i = 0; i < batch.length; i++){
        batch[i].addEventListener('click',()=>{

        const data = `{"date":"${batch[i].children[0].innerHTML}", 
                    "faculty":"${batch[i].children[2].innerHTML}", 
                    "time":"${batch[i].children[3].innerHTML}"}`;
        selectBatch = JSON.parse(data);
        console.log(selectBatch)
        // console.log(batch[i].children[0].innerHTML),
        // console.log(batch[i].children[2].innerHTML),
        // console.log(batch[i].children[3].innerHTML)
        batchOpenModal()
        })
    }


}


function closeModal(){
    newClassModal.style.display ='none';
    deleteClassModal.style.display = 'none';
    backDrop.style.display = 'none';
    batchTitleInput.value = '';
    clicked = null;
    load();
}

function saveSchedule(){
    // console.log(schedule.find(e => e.date === clicked))
    // console.log(clicked)
    if(batchTitleInput.value){
        let x = document.getElementById('facultyInput').selectedIndex
        let y = document.getElementById('facultyInput').options
        
        
        if(batchStartTime.value < batchEndTime.value){
            let l = schedule.length;
            let flag =0;

            while(l--){
                if(batchDateInput.value == schedule[l].date 
                    && y[x].text == schedule[l].faculty
                    && ((batchStartTime.value >= schedule[l].startTime
                        && batchStartTime.value <= schedule[l].endTime)
                    || (batchEndTime.value >= schedule[l].startTime
                        && batchEndTime.value <= schedule[l].endTime)
                        )
                        ){
                            flag = 1;
                            // batchStartTime.classList.add('error');
                            console.log(flag)
                            alert('Faculty busy at given time');
                }
                        console.log(flag)
            }
            if(flag == 0){
                schedule.push({
                date:batchDateInput.value,
                title:batchTitleInput.value,
                faculty:y[x].text,         
                startTime: batchStartTime.value,
                endTime : batchEndTime.value,   
            });

            localStorage.setItem('schedule',JSON.stringify(schedule));

            }
             
            closeModal();
            location.reload();
            alert('success');
            

        }
        else{
           batchStartTime.classList.add('error');
           alert('start time less than end time')
        }
    }else{
        batchTitleInput.classList.add('error');
    }
}


    console.log(schedule)

function deleteSchedule(){
    let l = schedule.length;

    while(l--){
        let time = schedule[l].startTime + ' - ' + schedule[l].endTime
        
        if(schedule[l].date == selectBatch.date && schedule[l].faculty== selectBatch.faculty && time == selectBatch.time){
            schedule.splice(l,1);
            
        }
    }

    console.log(schedule)
    localStorage.setItem('schedule', JSON.stringify(schedule));
    closeModal();
    load();
    location.reload();
}


        
function initButtons() {
    document.getElementById('nextBtn').addEventListener('click',()=>{
        nav++;
        load();

    });

    document.getElementById('prevBtn').addEventListener('click',()=>{
        nav--;
        load();

    });

    document.getElementById('today').addEventListener('click',()=>{
        nav = 0;
        
        load();

    });


    document.getElementById('saveBtn').addEventListener('click',saveSchedule);
    document.getElementById('cancelBtn').addEventListener('click',closeModal);
    document.getElementById('deleteBtn').addEventListener('click',deleteSchedule);
    document.getElementById('closeBtn').addEventListener('click',closeModal);

}

initButtons();
load();






// function fadeIn() {
        //     var fade = document.getElementById("container");
        //     var opacity = 0;
        //     var intervalID = setInterval(function() {
        //       fade.style.opacity = 0.5;  
        //         if (opacity < 1) {
        //             opacity = opacity + 0.1
        //             fade.style.opacity = opacity;
        //         } else {
        //             clearInterval(intervalID);
        //         }
        //     }, 200);
        // }





  