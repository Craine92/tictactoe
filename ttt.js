document.addEventListener("DOMContentLoaded", function () {
    let current = 0;
    const players = ["x", "o"];
    const hint = document.querySelector("#hint");
    const gameboard = document.querySelector("#gameboard");

    function markField(e) {
        const field = e.target;
        field.setAttribute("aria-label", players[current]);
        field.setAttribute("disabled", "disabled");
        current = 1 - current;
        hint.innerText = "Spieler " + players[current] + " ist am Zug";
        checkIfCompleted();
    }

    function checkIfCompleted() {
        let fields = document.querySelectorAll('#gameboard button');
        let winner = null;

    // Gewinner ermitteln
for (let i = 0; i < 3; i++) {
    // 3 senkrecht
    if (fields[0 + i].getAttribute('aria-label') !== "" &&
        fields[0 + i].getAttribute('aria-label') === fields[3 + i].getAttribute('aria-label') &&
        fields[3 + i].getAttribute('aria-label') === fields[6 + i].getAttribute('aria-label')) {
        // we have a winner!
        winner = fields[0 + i].getAttribute('aria-label');
        break; // Sobald ein Gewinner gefunden wurde, wird die Schleife beendet
    }

    // 3 waagerecht
    if (fields[i * 3].getAttribute('aria-label') !== "" &&
        fields[i * 3].getAttribute('aria-label') === fields[i * 3 + 1].getAttribute('aria-label') &&
        fields[i * 3 + 1].getAttribute('aria-label') === fields[i * 3 + 2].getAttribute('aria-label')) {
        // we have a winner!
        winner = fields[i * 3].getAttribute('aria-label');
        break; // Sobald ein Gewinner gefunden wurde, wird die Schleife beendet
    }
}

// diagonal links oben nach rechts unten
if (fields[0].getAttribute('aria-label') !== "" &&
    fields[0].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
    fields[4].getAttribute('aria-label') === fields[8].getAttribute('aria-label')) {
    winner = fields[0].getAttribute('aria-label');
}

// diagonal rechts oben nach links unten
if (fields[2].getAttribute('aria-label') !== "" &&
    fields[2].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
    fields[4].getAttribute('aria-label') === fields[6].getAttribute('aria-label')) {
    winner = fields[2].getAttribute('aria-label');
}

// diagonal rechts unten nach links oben
if (fields[6].getAttribute('aria-label') !== "" &&
    fields[6].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
    fields[4].getAttribute('aria-label') === fields[2].getAttribute('aria-label')) {
    winner = fields[6].getAttribute('aria-label');
}

// diagonal links unten nach rechts oben
if (fields[8].getAttribute('aria-label') !== "" &&
    fields[8].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
    fields[4].getAttribute('aria-label') === fields[0].getAttribute('aria-label')) {
    winner = fields[8].getAttribute('aria-label');
}

        // Spiel zu Ende?
        if (winner) {
            gameboard.removeEventListener("click", markField);
            hint.innerText = 'Das Spiel ist zu Ende, weil Spieler ' + winner + ' gewonnen hat!';
            hint.className = 'success';
        } else {
            let full = true;
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].getAttribute('aria-label') === "") {
                    full = false;
                    break;
                }
            }

        }
    }

    gameboard.addEventListener("click", markField);
});
