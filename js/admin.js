$(function () {

    var termekTombEredeti = [];
    const ajaxHivas = new AjaxHivas();

    let apivegpont = "http://localhost:3000/termekek"
    ajaxHivas.getAjax(apivegpont, megjelenit)

    function megjelenit(termekTomb) {

        const szuloElem = $(".tartalom");
        //szuloElem.empty();

        const sablonElem = $(".aruhaz");
        //sablonElem.show();

        for (let index = 0; index < termekTomb.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const adat = termekTomb[index];
            const galeria = new TermekAdmin(adat, ujElem);
        }
        termekTombEredeti = termekTomb;
        sablonElem.hide();


    }
    $(window).on("torles", (event) => {
        //console.log(event.detail.id);
        let azon = event.detail.id
        ajaxHivas.deleteAjax(apivegpont, azon)
        megjelenit(termekTombEredeti);


    });

    $(window).on("modositas", (event) => {

        $("#tnev").val(event.detail.nev);
        $("#leiras").val(event.detail.leiras);
        $("#ar").val(event.detail.ar);
    });

});
