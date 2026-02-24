function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createRolo(_text) {
    var innerRolo = document.createElement("div");
    innerRolo.className = "innerRolo";
    innerRolo.id = "moving";
    
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
    const blankRolo = createRolo("");
    const textRolo = createRolo("fast.sorry.horse");
    await delay(300);
    textRolo.remove();
    await delay(700);
    blankRolo.remove();
}

async function repeat() {
    for (let i = 0; i < 10; i++) {
        next();
        await delay(100);
    }
}
