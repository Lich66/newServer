let index = 0;
const timmer = setInterval(() => {
    if (index == 10) {
        clearInterval(timmer);
    }
    console.log(index);
    index++;

}, 1000);
