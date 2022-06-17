$(document).ready(function () {
  var table = $("table").DataTable({
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
    let action =
      $("#deleteModal form").attr("action") + "/" + id + "?_method=DELETE";
    console.log(action);
    $("#deleteModal form").attr("action", action);
  });

  $.ajax({
    url: "/api/class/all",
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
    url: "/api/subject/all",
    method: "GET",
  }).done((res) => {
    if (res) {
      if (res.subjects) {
        for (const sub of res.subjects) {
          $("select#subject-input").append(
            `<option value="${sub.ID}">${sub.Ten}</option>`
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
      if (res.students) {
        for (const student of res.students) {
          $("select#students-input").append(
            `<option value="${student.ID}">${student.MaSo} - ${student.HoTen}</option>`
          );
        }
      }
    } else {
      console.log("error...ajax");
    }
  });

  $("select").change(function () {
    if($("select#class-input").val() && $("select#subject-input").val() && $("select#term-input").val()) {
      $.get("/api/transcript", {
        class: $("select#class-input").val(),
        subject: $("select#subject-input").val(),
        term: $("select#term-input").val(),
      }).done(function (res) {
        const transcript = res.transcript;
        if (res) {
          table.clear().draw();
          for (let i = 0; i < transcript.length; i++) {
            table.row.add([
              i + 1,
              transcript[i].HoTen,
              `<input class="w-100 text-center score" type="number" id="row-${i+1}-d15" name="d15p" value="${transcript[i].Diem15Phut}" step="0.01" min="0" max="10" data-id="${transcript[i].ID}">`,
              `<input class="w-100 text-center score" type="number" id="row-${i+1}-d1t" name="d1t" value="${transcript[i].Diem1Tiet}" step="0.01" min="0" max="10" data-id="${transcript[i].ID}">`,
              `<input class="w-100 text-center score" type="number" id="row-${i+1}-dck" name="dck" value="${transcript[i].DiemCuoiKy}" step="0.01" min="0" max="10" data-id="${transcript[i].ID}">`,
            ]).draw(false);
          }
        } else {
          console.log("error...ajax");
        }
      });
    }
  });
  $("#transcript-table").on("blur", "input.score", function(event) {
    const id = $(this).attr("data-id");
    const score = {
      "d15p": $(`[data-id="${id}"][name="d15p"]`).val(),
      "d1t": $(`[data-id="${id}"][name="d1t"]`).val(),
      "dck": $(`[data-id="${id}"][name="dck"]`).val(),
    }
    $.post( `api/transcript/${id}?_method=PUT`, score)
    .done((res) => {
      if(res) {
        // console.log(res);
      } else {
        console.log("error...ajax");
      }
    })

  })


  $("select.multiple-select").select2({
    maximumSelectionLength: 40,
    width: "resolve",
    closeOnSelect: false,
  });
});
