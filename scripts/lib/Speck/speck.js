function Speck(container) {
    const module = {};

    module._container = container;
    module._yMax = null;
    module._yMin = 0;
    module._xMax = null;
    module._xMin = 0;
    module._particles = [];

    module.count = 30;
    module.minSize = 2;
    module.maxSize = 8;
    module.color = '#f2f2f2';
    module.speed = 50;
    module.yChange = 2;
    module.xChange = 0.5;
    module.direction = 'up'; //up or down

    module._decorateParticle = function (div, i) {
        div.setAttribute('class', 'speck speck-no-' + i);
        div.style.backgroundColor = module.color;

        const min = module.minSize;
        const max = module.maxSize;
        const hw = Math.floor(Math.random() * (max - min) + min) + 'px'
        div.style.height = hw;
        div.style.width = hw;
        div.style.position = 'absolute';
        div.style.borderRadius = '50%';
        div.style.transition = "top " + module.speed + "ms ease, " + "left " + module.speed + "ms ease";
        div.style.WebkitTransition = "top " + module.speed + "ms ease, " + "left " + module.speed + "ms ease";
        div.style.MsTransition = "top " + module.speed + "ms ease, " + "left " + module.speed + "ms ease";

        const yMax = module._yMax;
        const yMin = module._yMin;
        const xMax = module._xMax;
        const xMin = module._xMin;
        const x = Math.floor(Math.random() * (xMax - xMin) + xMin);
        const y = Math.floor(Math.random() * (yMax - yMin) + yMin);
        div.style.top = y + 'px';
        div.style.left = x + 'px';
        div.pos = { x: x, y: y };

        module._animateParticles(div);
    }

    module._computeSpace = function () {
        const container = module._container;
        const dimensions = container.getBoundingClientRect();

        module._dimensions = dimensions;
        module._yMax = dimensions.height;
        module._xMax = dimensions.width;
    }

    module._animateParticles = function (div) {
        const count = module.count;
        const yChange = module.yChange;
        const xChange = module.xChange;
        const interval = module.speed;
        const yMax = module._yMax;
        const xMax = module._xMax;
        const direction = module.direction;

        window.setInterval(function () {
            let newY = 0;
            if(module.direction == "up"){
                newY = div.pos.y - yChange;
                newY = newY <= 0 ? yMax : newY;

                if(newY == yMax){
                    div.style.opacity = 0;
                    window.setTimeout(function(){ div.style.opacity = 1; }, module.speed * 3)
                }
            }
            else if(module.direction == "down"){
                newY = div.pos.y + yChange;
                newY = newY >= yMax ? 0 : newY;

                if(newY == 0){
                    div.style.opacity = 0;
                    window.setTimeout(function(){ div.style.opacity = 1; }, module.speed * 3)
                }
            }
            div.style.top = newY + "px";
            div.pos.y = newY;

            let newX = Math.random() < 0.5 ? xChange : (-1 * xChange);
            newX = div.pos.x - newX;
            newX = newX <= 0 ? 0 : newX;
            newX = newX >= xMax ? xMax : newX;
            div.style.left = newX + "px";
            div.pos.x = newX;

        }, interval);
    }

    module.render = function () {
        const count = module.count;

        module._computeSpace();

        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            module._decorateParticle(div, i);
            module._particles.push(div);
            module._container.appendChild(div);
        }
    }

    return module;
}