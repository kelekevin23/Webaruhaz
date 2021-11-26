$(function () {

    var termekTomb = [];
    const ajaxHivas = new AjaxHivas();

    let apivegpont = "http://localhost:3000/termekek"
    ajaxHivas.getAjax(apivegpont, megjelenit)

    function megjelenit(termekTomb) {


        const szuloElem = $(".tartalom");
        szuloElem.empty();

        const sablonElem = $("section .aruhaz");
        sablonElem.show();

        for (let index = 0; index < termekTomb.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const adat = termekTomb[index];
            const galeria = new TermekVasarlo(adat, ujElem);
        }
        /*
        termekek.forEach(function (elem) {
          let node = sablonElem.clone().appendTo(szuloElem)
          const obj = new TermekAruhaz(node, elem)
        })
        */
        sablonElem.hide();
        const ujTermek = new Kosar();

        $(window).on("kosarKattintas", (event) => {
            ujTermek.setAdatok(event.detail.nev, event.detail.ar);
        });



    }
    $("#opciok").on("click", (event) => {
        szuresSzempont = $("#opciok").val();
        $("#keres").val("");
        let eleresiUt = "";


        if (szuresSzempont === "nevCsokkeno") {
            eleresiUt = "http://localhost:3000/termekek?_sort=nev&_order=desc";

        } if (szuresSzempont === "nevNovekvo") {
            eleresiUt = "http://localhost:3000/termekek?_sort=nev";

        } if (szuresSzempont === "arCsokkeno") {
            eleresiUt = "http://localhost:3000/termekek?_sort=ar&_order=desc";

        } if (szuresSzempont === "arNovekvo") {
            eleresiUt = "http://localhost:3000/termekek?_sort=ar";
        } if (szuresSzempont === "") {
            eleresiUt = "http://localhost:3000/termekek";
        }

        ajaxHivas.getAjax(eleresiUt, megjelenit);

    });

    $("#keres").keyup(function(){
        let eleresiUt = "http://localhost:3000/termekek";
        ajaxHivas.getAjax(eleresiUt, megjelenit);
        $("#opciok").val("");
        

        let szoveg = $("#keres").val();
        let eleresiUtKeres = "http://localhost:3000/termekek?nev_like="+szoveg;
        ajaxHivas.getAjax(eleresiUtKeres, megjelenit);

    });

});
