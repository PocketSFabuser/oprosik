const q1p1 = document.getElementById('qp1');
const q1btn1 = document.getElementById('qbtn1');
const q1btn2 = document.getElementById('qbtn2');
var v1 = 0;
var q1btn1clicked = 0;
var q1btn2clicked = 0;
var q2btn1clicked = 0;
var q2btn2clicked = 0;

function q1() {
    console.warn('q1 is called');
    document.getElementById('start').style.display = 'block';
    q1p1.style.display = 'none';
    q1btn1.style.display = 'none';
    q1btn2.style.display = 'none';
    setTimeout( () => {
        q1p1.style.display = 'block';
        q1btn1.style.display = 'block';
        q1btn2.style.display = 'block';
        v1 = 1;
    }, 3000); 
    if (v1 == 1) {
        document.getElementById('start').style.display = 'none';
        document.getElementById('start').style.marginTop = '-1vh';
    } 
    q1btn1.addEventListener('click', () => {
        q1btn1clicked = 1;
    });
    q1btn2.addEventListener('click', () => {
        q1btn2clicked = 1;
    } );

    if (q1btn1clicked == 1 || q1btn2clicked == 1) {
        console.log('qbtn clicked');
        q1p1.style.display = 'none';
        q1btn1.style.display = 'none';
        q1btn2.style.display = 'none';
        setTimeout ( () => {
            q2p1.style.display = 'block';
            q2btn1.style.display = 'block';
            q2btn2.style.display = 'block';
            q2();
        }, 2000);
    }
}

function q2() {
    console.warn('q2 is called');
    if (q2btn1clicked == 1 || q2btn2clicked == 1) {
        console.log('qbtn clicked');
        q2p1.style.display = 'none';
        q2btn1.style.display = 'none';
        q2btn2.style.display = 'none';
        setTimeout ( () => {
            q3p1.style.display = 'block';
            q3btn1.style.display = 'block';
            q3btn2.style.display = 'block';
            q3();
        }, 2000);
    }
}

function q3() {
    console.log(' q3 id called!');
}

window.onload = q1();