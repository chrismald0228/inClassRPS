const ui = {
    displayImage: function(pickObj, disId) {
        const imgHtml = `<img src='imgs/${pickObj.img}' width='100px' alt="${pickObj.item}"'>`;
        document.getElementById(disId).innerHTML = imgHtml;
    },
    updateDisplayObj: function(msgObj, disId) {
        let inHTML  = msgObj.msg;
        inHTML += `<img src='imgs/${msgObj.img}' width='100px' alt="${msgObj.alt}"'>`;
        // alert( inHTML );
        document.getElementById(disId).innerHTML = inHTML;
    },
    updateDisplayValue: function(msg, disId) {
        // let inHTML  = msgObj.msg;
        // inHTML += `<br /><img src='imgs/${msgObj.img}' width='100px' alt="${msgObj.alt}"'>`;
        document.getElementById(disId).innerHTML = msg;
    },
    updateStatsDisplay: function(state) {
        this.updateDisplayValue(state.wins, "wins");
        this.updateDisplayValue(state.losses, "loss");
        this.updateDisplayValue(state.draws, "draws");
        this.updateDisplayValue(state.winnings, "tWins");
    }
};

const game = {
    rules: [
        { id: 0, item: 'rock', beats: 'scissors', img: 'rock.PNG' },
        { id: 1, item: 'paper', beats: 'rock', img: 'paper.PNG' },
        { id: 2, item: 'scissors', beats: 'paper', img: 'scissors.PNG' }
    ],
    state: {
        wins: 0,
        losses: 0,
        draws: 0,
        winnings: 0
    },
    messages: {
        win: {msg : "Winner!", img : 'homerWin.png', alt:"Homer Wins!"},
        loss: {msg : "Loser!", img: 'homerLoss.png', alt:"Homer Loss!"},
        draw: {msg : "Draw!", img: 'homerTied.png', alt : "Homer Tied up!"}
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    evaluateResult: function(cPickObj, uPickObj) {
        if (uPickObj.beats === cPickObj.item) {
            this.state.wins++;
            // alert( "Win");
            return this.messages.win;
        } else if (cPickObj.beats === uPickObj.item) {
            this.state.losses++;
            // alert( "Loss");
            return this.messages.loss;
        } else {
            this.state.draws++;
            // alert( "Draw");
            return this.messages.draw;
        }
    },
    evaluateWinnings: function(result){
        let betDOM = document.getElementById('bet');
        let bet = parseInt(betDOM.value);
        if(result === this.messages.win){
            this.state.winnings += bet;
        } else if(result === this.messages.loss){
            this.state.winnings -= bet;
        }
        return this.state.winnings;
    },
    reset: function() {
        this.state.wins = 0;
        this.state.winnings = 0;
        this.state.losses = 0;
        this.state.draws = 0;
    },
    checkGameResults: function(){
        if(this.state.winnings >= 100){
            alert("You win !!!")
            this.reset()
        } else if(this.state.winnings <= -100){
            alert("You lost ...")
            this.reset()
        }

    }

};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mainButton").addEventListener("click", function() {
        const cPickIndex = game.getRandomInt(0, 2);
        const cPickObj = game.rules[cPickIndex];
        ui.displayImage(cPickObj, "cPick");

        const uPickIndex = parseInt(document.getElementById("sel1").value);
        const uPickObj = game.rules[uPickIndex];
        ui.displayImage(uPickObj, "uPick");

        const resultObj = game.evaluateResult(cPickObj, uPickObj);
        // document.getElementById("resArea").innerHTML = resultMessage;
        game.evaluateWinnings(resultObj);
        game.checkGameResults();
        ui.updateDisplayObj(resultObj, "resArea");
        ui.updateStatsDisplay(game.state); // Call to update all stats
    });
    document.getElementById("resetButton").addEventListener("click", function(){
        game.reset();
        ui.updateStatsDisplay(game.state);
        document.getElementById('bet').value = 0;
    });
});