const dino = document.getElementById('dino');
const obstaclesContainer = document.getElementById('obstacles');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameSpeed = 10;

let dinoFrames = ['diplodocus1.png','diplodocus2.png','diplodocus3.png','diplodocus4.png'];
let currentFrame = 0;

function animateDino() {
    dino.src = dinoFrames[currentFrame];
    currentFrame = (currentFrame + 1) % dinoFrames.length;
    setTimeout(animateDino, 150);
}
animateDino();

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;

    let upInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 10;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 10;
        dino.style.bottom = position + 'px';
    }, 20);
}

function createObstacle() {
    const obstacle = document.createElement('img');
    obstacle.classList.add('obstacle');
    obstacle.src = Math.random() > 0.5 ? 'rock.png' : 'fern.png';
    obstacle.style.right = '-50px';
    obstaclesContainer.appendChild(obstacle);

    let obstaclePosition = 0;
    const moveInterval = setInterval(() => {
        obstaclePosition += gameSpeed;

        if (obstaclePosition > 850) {
            clearInterval(moveInterval);
            obstaclesContainer.removeChild(obstacle);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            gameSpeed += 0.2;
        } else if (obstaclePosition > 50 && obstaclePosition < 150 && parseInt(dino.style.bottom) < 40) {
            clearInterval(moveInterval);
            alert('Game Over! Score: ' + score);
            window.location.reload();
        }

        obstacle.style.right = obstaclePosition + 'px';
    }, 20);

    setTimeout(createObstacle, Math.random() * 2000 + 1000);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});

createObstacle();
