function getCursorPosition() {
    if (event.ctrlKey) {
        mapOffsetLeft = $('#map').getBoundingClientRect().width * .015;
        mapOffsetTop = $('#map').getBoundingClientRect().height * .03;
        pinLeft = event.clientX - mapOffsetLeft;
        pinTop = event.clientY - mapOffsetTop;
        console.log(`$pos: { left: ${Math.round(pinLeft)}, top: ${Math.round(pinTop)} },`);
    }
}

function pinTooltip(element) {
    const dot = element.closest('.dot');
    if (!dot) {
        console.error('Pas de point trouvé, erreur critique');
    } else {
        event.preventDefault();
        event.stopPropagation();
        dot.classList.toggle('pinned');
    }
}

function toggleMore(element) {
    const block = element.closest('p');
    block.classList.toggle('more');    
}

function reloadDots(init = false) {
    if (init) {
        $$('input[default]').forEach(i => i.checked = true);
    }
    
    let dots = [];
    Array.from($$('input')).map(input => {
        if (input.checked) {
            dots.push(g_data[input.name]);
        }
    });
    loadDots(dots.flat());
}

function clearDots() {
    $$('.dot').forEach(dot => {
        dot.parentElement.removeChild(dot);
    });
}

function toggleCompactMode() {
    $('#map').classList.toggle('compact', $('#compact').checked);
}

function markup(string) {
    string = string.replaceAll('{', '<sup>').replaceAll('}', '</sup>');
    string = string.replaceAll('[', '<strong>').replaceAll(']', '</strong>');
    return string;
}

function loadDots(dots) {
    clearDots();

    if (dots) {
        const template = $('template#tpl-dot'),
            fragment = document.createDocumentFragment();

        dots.map(dotdata => {
            const dot = document.importNode(template.content, true);
            for (key in dotdata) {
                if (!key.includes('$') && !key.includes('_')) {
                    let slot = dot.querySelector('.d-' + key);
                    if (slot) {
                        slot.innerHTML = markup(dotdata[key]);
                    } else {
                        console.warn('clef non reconnue', key);
                    }
                } else if (key.includes('_') && dotdata[key].length) {
                    let slot = dot.querySelector('.d-' + key.substr(1));
                    slot.textContent = dictionary[key];

                    slot.innerHTML += `<span class="more-btn" onclick="toggleMore(this)"></span>`;
                    htmlList = dotdata[key].map(value => `<li>${markup(value)}</li>`).join('');
                    slot.innerHTML += `<span class="more-content">${htmlList}</span>`;
                    
                    if (dotdata[key].length == 1) {
                        slot.classList.add('more');
                    }
                }

                let [offsetX, offsetY] = isMobile ? [-5, 0] : [0, 0];
                dot.querySelector('.dot').style.left = dotdata.$pos.left + offsetX + 'px';
                dot.querySelector('.dot').style.top = dotdata.$pos.top + offsetY + 'px';

                dot.querySelector('.dot .d-icon').classList.add(dotdata.$type);
            }
            fragment.appendChild(dot);
            $('#map').appendChild(fragment);
        });
    } else {
        console.error('DONNÉES INTROUVABLES! Confer data.js')
    }
}

window.onload = () => {
    toggleCompactMode();
    reloadDots(true);
}