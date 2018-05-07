var utilidades = (function () {

    var getDatos = function (url) {
        return $.get(url);
    };

    var postDatos = function (urlpost, data) {

        return $.post({
            url: urlpost,
            data: data
        });
    };

    var fetchDatos = function (urlpost, data) {

        return $.post({
            url: urlpost,
            dataType: "json",
            contentType: "application/json",
            data: data
        });
    };

    var postAjaxDatos = function (urlpost, data) {

        console.log(data);

        return $.ajax({
            url: urlpost,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false
        });

    };

    var DeleteAjaxDatos = function (urlpost) {
        return $.ajax({
            url: urlpost,
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            processData: false
        });
    };

    return {
        getDatos: getDatos,
        postDatos: postDatos,
        fetchDatos: fetchDatos,
        postAjaxDatos: postAjaxDatos,
        DeleteAjaxDatos: DeleteAjaxDatos
    };
})();