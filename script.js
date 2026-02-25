let x = 0;
let dir = 0;
let ticking = false;

let list = ["sorry.horse", "very.sorry.horse", "fast.sorry.horse", "faster.sorry.horse", "fastest.sorry.horse", "movies.sorry.horse", "birds.sorry.horse"];

document.addEventListener("wheel", (event) => {
    window.scrollTo(0,0);
  if (!ticking) {
    // Throttle the event to "do something" every 20ms
    setTimeout(() => {
        if (event.deltaY > 0) {
            next();
          } else if (event.deltaY < 0) {
              prev();
          }
      ticking = false;
    }, 200);

    ticking = true;
  }
});


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createRolo(_text, id) {
    var innerRolo = document.createElement("div");
    innerRolo.className = "innerRolo";
    innerRolo.id = id;
    x-= 1;
    innerRolo.style.zIndex = x;


    var topPad = document.createElement("div");
    topPad.className = "topPad";
    
    var text = document.createElement("h2");
    text.textContent = _text;
    topPad.appendChild(text);
    
    var bottomPad = document.createElement("div");
    bottomPad.className = "topPad";
    bottomPad.style.opacity = 0;

    innerRolo.appendChild(topPad);
    innerRolo.appendChild(bottomPad);
    var base = document.getElementsByClassName("rolobase")[0];
    base.appendChild(innerRolo);
    return innerRolo;
}

async function next() {
    if (dir < 0) {
        return;
    }
    dir += 1;
    const text = list.shift();
    list.push(text);
    const baseText = document.getElementById("base");
    baseText.innerText = list[0];
    const a = document.getElementsByTagName('a')[0];
    a.href = "http://" + list[0];
    const textRolo = createRolo(text, "moving");
    const blankRolo = createRolo("", "moving");
    await delay(300);
    textRolo.remove();
    blankRolo.style.zIndex = Math.abs(blankRolo.style.zIndex);
    await delay(700);
    blankRolo.remove();
    dir -= 1;
}

async function prev() {
    if (dir > 0) {
        return;
    }
    dir -= 1
    const text = list.pop();
    list.unshift(text);
    const blankRolo = createRolo("", "movingBack");
    const textRolo = createRolo(text, "movingBack");
    await delay(300);
    blankRolo.remove();
    textRolo.style.zIndex = Math.abs(blankRolo.style.zIndex);
    await delay(700);
    textRolo.remove();
    const baseText = document.getElementById("base");
    baseText.innerText = text;
    const a = document.getElementsByTagName('a')[0];
    a.href = "http://" + text;
    dir += 1;
}
async function repeat() {
    for (let i = 0; i < 10; i++) {
        next();
        await delay(100);
    }
}

window.onload = async function() {
    for (let i = 0; i < list.length; i++) {
        next();
        await delay(50);
    }
    for (let i = 0; i < list.length * 2; i++) {
        next();
        await delay(50 + 20 * (i*i / list.length));
    }
};
