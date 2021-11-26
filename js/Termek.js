class Termek{
    constructor(adat, elem){

        this.elem = elem;
        this.adat = adat;

        this.nev = this.elem.children(".termeknev");
        this.leiras = this.elem.children(".leiras");
        this.ar = this.elem.children(".ar");        
    }
    beallit(ertekek){  
        this.nev.html(ertekek.nev);
        this.kep.attr("src", ertekek.kep);
        this.leiras.html(ertekek.leiras);
        this.ar.html(ertekek.ar+"Ft");
    }

}

class TermekVasarlo extends Termek{
    constructor(adat,elem){
        super(adat,elem);
        this.kep = this.elem.children(".kep");
        
        this.gomb = this.elem.children(".kosarba");
        this.gomb.html("Kosárba");
        this.beallit(this.adat);

        this.gomb.on("click", ()=>{
            this.kattintasTrigger();
        });
    }
    kattintasTrigger(){
        let esemeny = new CustomEvent("kosarKattintas", {detail:this.adat});
        window.dispatchEvent(esemeny);

    }
}
class TermekAdmin extends Termek{
    constructor(adat,elem){
        super(adat,elem);
        this.kep = this.elem.children(".kep").children("img");
        this.beallit(this.adat);

        this.torlesElem = this.elem.children("td").children(".torol");
        this.modositElem = this.elem.children("td").children(".modosit");

        this.torlesElem.on("click", ()=>{
            this.torolTrigger();
        });

        this.modositElem.on("click", ()=>{
            this.modositTrigger();
        });
    }
    torolTrigger(){
        let esemeny = new CustomEvent("torles", {detail:this.adat});
        window.dispatchEvent(esemeny);

    }

    modositTrigger(){
        let esemeny = new CustomEvent("modositas", {detail:this.adat});
        window.dispatchEvent(esemeny);

    }
}