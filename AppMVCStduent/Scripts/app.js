var utilidades = (function () {

    var getDatos = function (url) {
        return ($.get(url));
    };

    var postDatos = function (url, data) {

        var urlPost = document.location.origin + url;
        return ($.post({
            url: url,
            data: data
        }));
    };

    var fetchDatos = function (url, data) {

        var urlPost = document.location.origin + url;
        return ($.post({
            url: urlPost,
            dataType: "json",
            contentType: "application/json",
            data: data
        }));
    };

    return {
        getDatos: getDatos,
        postDatos: postDatos,
        fetchDatos: fetchDatos
    }

})();

var StudentInfoController = (function () {

    var DOMStrings = {
        tableHeaders: "#table-headers",
        tableRows: "#table-rows"
    };

    var DOMEventStrings = {
    };

    var APIurlStrings = {
        apiAddStudent: '/api/student/',
        apiGetByIdStudent: '/api/student/',
        apiGetAll: 'http://localhost:50720/api/student/GetAll',
        apiDeleteStudent: '/api/student/',
        apiUpdateStudent: '/api/student/'
    };

    var dataTableStudent = {
        "row_header": ["Id", "Name", "Apellidos", "Dni", "Fecha Nacimiento", "Edad", "Fecha Creacion"]
    };

    var getDOMEventStrings = function () {
        return DOMEventStrings;
    };

    var getAPIurlStrings = function () {
        return APIurlStrings;
    };

    var getHeadersHtml = function (data) {
        return "<tr>" + data.row_header.map(function (headfield) {
            return "<th>" + headfield + "</th>";
        }).join("") + "</tr>";
    };

    var renderHeaders = function (data, table) {
        var html = getHeadersHtml(data);
        $(table).html(html);
    };

    function getRowsHtml(data) {
        console.log(data);
        return data.map(function (row, i) {
            return "<tr>" + getColumnsHtml(row) + "</tr>";
        }).join("");
    }

    function getColumnsHtml(row) {
        console.log(row);
        var html = '';
        for (var student in row) {
            html += "<td>" + row[student] + "</td>"
        }
        return html;
    }

    function renderRows(data, table) {
        var html = getRowsHtml(data);
        $(table).html(html);
    }

    var renderTable = function (data) {
        renderHeaders(dataTableStudent, DOMStrings.tableHeaders);
        renderRows(data, DOMStrings.tableRows);
    };

    var loadApiStudents = function () {

        var getApiStudents = utilidades.getDatos(APIurlStrings.apiGetAll);

        getApiStudents.done(function (data) {

            console.log(data);
            showTableStudents(data);

        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
        });
    };

    var showTableStudents = function (data) {
        renderTable(data);
    };

    return {
        getDOMEventStrings: getDOMEventStrings,
        getApiurlStrings: getAPIurlStrings,
        loadApiStudents: loadApiStudents
    };

})();


var controller = (function (StudentInfoCtrl) {

    var setupEventListeners = function () {

    };

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
            StudentInfoCtrl.loadApiStudents();
        }
    };


})(StudentInfoController);

$(function () {
    controller.init();
});
