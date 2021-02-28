'use strict';

import PopUp from './popup.js';
import * as sound from "./sound.js";
import { GameBuilder, Reason } from './game.js';

const ITEM_COUNT = 20;
const GAME_DURATION_SECOND = 10;


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(GAME_DURATION_SECOND)
    .itemCount(ITEM_COUNT)
    .build();

game.setGameStopListener(reason => {
    let message; 

    switch(reason) {
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Win 🎉';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You Lost 🤦‍♂️';
            sound.playBug();
            break;
        default:
            throw new Error('Invalid error');
    }

    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});