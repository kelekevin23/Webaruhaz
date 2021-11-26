$(function () {

    const ajaxHivas = new AjaxHivas();

    let apivegpont = "http://localhost:3000/termekek"
    ajaxHivas.getAjax(apivegpont, megjelenit)

    var id = 0;
    function megjelenit(termekTomb) {

        const szuloElem = $(".tartalom");
        //szuloElem.empty();

        const sablonElem = $("thead .aruhaz");
        //sablonElem.show();

        for (let index = 0; index < termekTomb.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const adat = termekTomb[index];
            const galeria = new TermekAdmin(adat, ujElem);
        }
        sablonElem.remove();
        $('#mod').prop('disabled', true);

    }
    $(window).on("torles", (event) => {
        let azon = event.detail.id
        ajaxHivas.deleteAjax(apivegpont, azon)

        ajaxHivas.getAjax(apivegpont, megjelenit)
    });

    $(window).on("modositas", (event) => {

        $('#mod').prop('disabled', false);
        $('#uj').prop('disabled', true);

        $("#tnev").val(event.detail.nev);
        $("#leiras").val(event.detail.leiras);
        $("#ar").val(event.detail.ar);

        id = event.detail.id;

        $("#mod").on("click", () => {
            $('#uj').prop('disabled', false);
            let adat = {
                id: id,
                nev: $("#tnev").val(),
                leiras: $("#leiras").val(),
                ar: $("#ar").val(),
                kep: "kepek/kep_4.jpeg",
            }

            ajaxHivas.putAjax(apivegpont, adat, id);
            ajaxHivas.getAjax(apivegpont, megjelenit)
        });

    });

    $("#uj").on("click", () => {

        let adat = {
            nev: $("#tnev").val(),
            leiras: $("#leiras").val(),
            ar: $("#ar").val(),
            kep: "kepek/kep_4.jpeg",
        }

        console.log(adat)

        ajaxHivas.postAjax(apivegpont, adat);

        ajaxHivas.getAjax(apivegpont, megjelenit)
    });

});
