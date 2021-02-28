'use strict'

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js"

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }    

    itemCount(num) {
        this.itemCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, 
            this.itemCount
        );
    }
}

class Game {
    constructor(gameDuration, itemCount) {
        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameDuration = gameDuration;
        this.itemCount = itemCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        
        this.playButton = document.querySelector('.game__button');
        this.playButton.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            }
            else {
                this.start();
            }
        });

        this.gameField = new Field(itemCount);
        this.gameField.setClickListener(this.onItemClick);
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.score = 0;
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimeAndScore();
        this.startGameTimer();
        sound.playBackground()
    }
    
    stop(reason) {
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerHTML = this.itemCount;
        this.gameField.init();
    }

    showStopButton() {
        const icon = this.playButton.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.playButton.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.playButton.style.visibility = 'hidden';
    }
    
    showTimeAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer() {
        let remainingTimeSecond = this.gameDuration;
        this.updateTimerText(remainingTimeSecond);
        this.timer = setInterval(() => {
            if (remainingTimeSecond <= 0) {
                clearInterval(this.timer);
                this.stop(this.itemCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSecond);
        }, 1000) ;
    }
    
    updateTimerText(time)  {
        const minutes = Math.floor(time / 60);
        const second = time % 60;
        this.gameTimer.innerHTML = `${minutes}:${second}`;
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    updateScoreBoard() {
        this.gameScore.innerHTML = this.itemCount - this.score;
    }
    
    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.itemCount) {
                this.stop(Reason.win);
            }
        }
        else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        }
    }
}
