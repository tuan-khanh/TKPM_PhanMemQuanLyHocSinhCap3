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
    $("#deleteModal").attr("action", `/student/${id}?_method=DELETE`);
    console.log($("#deleteModal").attr("action"));
  });

  $.ajax({
    url: "/api/class/available/all",
    method: "GET",
  }).done((res) => {
    if (res) {
      console.log(res);
      if (res.classes) {
        for (const cls of res.classes) {
          $("#class-input").append(
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
        console.log(res.students);
        for (const student of res.students) {
          $("#students-input").append(
            `<option value="${student.MaSo}">${student.MaSo} - ${student.HoTen}</option>`
          );
        }
      }
    } else {
      console.log("error...ajax");
    }
  });
  $(".multiple-select").select2();
});
