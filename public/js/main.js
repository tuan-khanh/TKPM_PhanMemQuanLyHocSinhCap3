$(document).ready(function () {
  $("#table").DataTable({
    responsive: true,
    columnDefs: [
      {
        target: [-1],
        searchable: false,
        orderable: false,
      },
    ],
  });

  $('a[href="#deleteModal"]').click(function () {
    const id = $(this).attr("data-id");
    console.log(id);
    let action = $("#deleteModal form").attr("action") + "/" + id + "?_method=DELETE";
    console.log(action);
    $("#deleteModal form").attr("action", action);
  });

  $.ajax({
    url: "/api/class/available/all",
    method: "GET",
  }).done((res) => {
    if (res) {
      if (res.classes) {
        for (const cls of res.classes) {
          $("select#class-input").append(
            `<option value="${cls.ID}">${cls.Ten}</option>`
          );
        }
      }
    } else {
      console.log("error...ajax");
    }
  });

  $.ajax({
    url: "/api/student/available/all",
    method: "GET",
  }).done((res) => {
    if (res) {
      console.log(res);
      if (res.students) {
        for (const student of res.students) {
          $("select#students-input").append(
            `<option value="${student.MaSo}">${student.MaSo} - ${student.HoTen}</option>`
          );
        }
      }
    } else {
      console.log("error...ajax");
    }
  });

  

  $("select.multiple-select").select2({
    maximumSelectionLength: 40,
    width: 'resolve',
    closeOnSelect: false,
  });
});
