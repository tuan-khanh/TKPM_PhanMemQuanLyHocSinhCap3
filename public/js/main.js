$(document).ready(function () {
    $("table").each(function () {
        $(this).DataTable();
        console.log(this);
    });
});