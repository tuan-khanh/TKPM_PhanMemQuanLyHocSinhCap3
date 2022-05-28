$(document).ready(function () {
    $("#all-table").DataTable({
        responsive: true,
        columnDefs: [
            {
                target: [6],
                searchable: false,
                orderable: false,
                
            },
        ],

    });

    $('a[href="#deleteModal"]').click(function () {
        const id = $(this).attr("data-id");
        console.log(id)
        $("#deleteModal").attr("action", `/student/${id}?_method=DELETE`);
        console.log($("#deleteModal").attr("action"));
    })

});