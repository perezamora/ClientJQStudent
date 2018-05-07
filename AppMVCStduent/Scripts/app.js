
var StudentInfoController = (function () {

    var DOMStrings = {
        tableHeaders: "#table-headers",
        tableRows: "#table-rows"
    };

    var DOMEventStrings = {
        viewstudent: ".view_student",
        editstudent: ".edit_student",
        deletestudent: ".delete_student"
    };

    var APIurlStrings = {
        apiGetByIdStudent: 'http://localhost:50720/api/student/Read',
        apiGetAll: 'http://localhost:50720/api/student/GetAll',
        apiDeleteStudent: 'http://localhost:50720/api/student/Delete/',
        apiUpdateStudent: 'http://localhost:50720/api/student/Update'
    };

    var dataTableStudent = {
        "row_header": ["Id", "Name", "Apellidos", "Dni", "Edad"]
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
            if (student !== "FechaNacimiento" &&
                student !== "FechaCreacion") {
                html += "<td>" + row[student] + "</td>";
            }
        }

        html += "<td><span type='button' class='view_student btn btn-info' data-student='" + row.Id + "'> View </span></td>";
        html += "<td><span type='button' class='edit_student btn btn-success' data-student='" + row.Id + "'> Edit </span></td>";
        html += "<td><span type='button' class='delete_student btn btn-danger' data-student='" + row.Id + "'> Delete </span></td>";

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

            $(DOMEventStrings.deletestudent).on("click", deleteStudent);
            $(DOMEventStrings.viewstudent).on("click", viewStudent);
            $(DOMEventStrings.editstudent).on("click", editStudent);

        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
        });
    };

    var showTableStudents = function (data) {
        renderTable(data);
    };

    var deleteStudent = function (event) {

        var $target = $(event.target);
        var dataIdStudent = $target.data("student");

        var urlDelete = APIurlStrings.apiDeleteStudent + dataIdStudent;
        var getApiDeleteStudent = utilidades.DeleteAjaxDatos(urlDelete);

        getApiDeleteStudent.success(function (data, textStatus, jQxhr) {
            location.href = "/";
        }).error(function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        });

    };

    var viewStudent = function (event) {

        var $target = $(event.target);
        var dataIdStudent = $target.data("student");

        var urlSelect = APIurlStrings.getApiReadStudent + dataIdStudent;
        var getApiReadStudent = utilidades.getDatos(APIurlStrings.urlSelect);

        getApiReadStudent.done(function (data) {
            location.href = "Views/view.html?id=" + dataIdStudent;
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
        });
    };

    var editStudent = function (event) {

    };

    return {
        loadApiStudents: loadApiStudents
    };

})();


var controller = (function (StudentInfoCtrl) {

    return {
        init: function () {
            console.log('Application has started');
            StudentInfoCtrl.loadApiStudents();
        }
    };


})(StudentInfoController);

$(function () {
    controller.init();
});
