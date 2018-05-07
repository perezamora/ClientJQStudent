
var StudentCreateController = (function () {

    var DOMStrings = {
        name: "#name",
        apellidos: "#apellidos",
        dni: "#dni",
        fechanacimiento: "#fechanacimiento"
    };

    var DOMEventStrings = {
        createStudent: '#create_student'
    };

    var APIurlStrings = {
        apiAddStudent: 'http://localhost:50720/api/student/Add'
    };


    var getDOMEventStrings = function () {
        return DOMEventStrings;
    };

    var getAPIurlStrings = function () {
        return APIurlStrings;
    };

    var createUsrStudent = function () {

        console.log("createUsrStudent");

        event.preventDefault();
        var name = $(DOMStrings.name).val();
        var apellidos = $(DOMStrings.apellidos).val();
        var dni = $(DOMStrings.dni).val();
        var fechaNac = $(DOMStrings.fechanacimiento).val();

        var student = {};
        student.Name = name;
        student.Apellidos = apellidos;
        student.Dni = dni;
        student.FechaNacimiento = "2008-04-21T10:20:04.0783599+02:00";

        var PostApiAddStudent = utilidades.postAjaxDatos(APIurlStrings.apiAddStudent, student);
        PostApiAddStudent.success(function (data, textStatus, jQxhr) {
            location.href = "/";
        }).error(function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        });
    };


    return {
        getDOMEventStrings: getDOMEventStrings,
        createUsrStudent: createUsrStudent
    };

})();


var controller = (function (StudentCreateCtrl) {

    var setupEventListeners = function () {
        var DOMEvent = StudentCreateCtrl.getDOMEventStrings();
        $(DOMEvent.createStudent).on("click", StudentCreateCtrl.createUsrStudent);
    };

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    };


})(StudentCreateController);

$(function () {
    controller.init();
});
