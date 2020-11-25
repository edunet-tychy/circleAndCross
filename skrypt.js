const GRACZ_1 = 'O';
const GRACZ_2 = 'X';
const plansza = [['', '', ''], ['', '', ''], ['', '', '']];
const kombinacje = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],[2, 4, 6]];
const pola = [...document.querySelectorAll(".pole")];

const status = document.querySelector("#status");
let gra = 1;
let remis = true;

pola.forEach(pole => pole.addEventListener('click', wybor));

function wybor(event){
    const {wiersz, kolumna} = event.target.dataset;
    const gracz = gra % 2 === 0 ? GRACZ_1 : GRACZ_2;

    if(plansza[wiersz][kolumna] !== '') return;
    
    event.target.innerHTML = gracz;

    plansza[wiersz][kolumna] = gracz;
    gra++;

    if (zaznacz()) {
    	status.innerHTML = zaznacz();
    	pola.forEach(pole => pole.removeEventListener('click', wybor));
    }

}

function zaznacz(){
    
    const wynik = plansza.reduce((calosc, wiersz) => calosc.concat(wiersz));
    let sukces = null;
    let zapis = {'X': [], 'O': []};
    let poleZaznaczone = 0;
    
    wynik.forEach( function (pole, index) {
    	zapis[pole] ? zapis[pole].push(index) : null;
    	if(wynik[index]){
    		poleZaznaczone++;
    	}

    });

    kombinacje.forEach(kombinacja => {

        if (kombinacja.every(index => zapis[GRACZ_1].indexOf(index) > -1)){
            sukces = 'Zwycieza: Gracz O!';
            remis = false;
        }
        if (kombinacja.every(index => zapis[GRACZ_2].indexOf(index) > -1)) {
            sukces = "Zwycieza: Gracz X!";
            remis = false;
        }
        if (remis && poleZaznaczone == 9){
        	sukces = "Remis!";
        }
    })

    return sukces;
}
