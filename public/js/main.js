// import JustValidate from 'just-validate';
$(document).ready(function () {
  var table = $("table").DataTable({
    responsive: true,
    columnDefs: [
      {
        target: [-1],
        searchable: false,
        orderable: false,
      },
      {
        target: [0],
        searchable: false,
      },
    ],
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

  if($("#subject-input").length) {
    $.ajax({
      url: "/api/subject/all",
      method: "GET",
    }).done((res) => {
      if (res.success) {
        if (res.subjects) {
          console.table(res.subjects)
          for (const sub of res.subjects) {
            $("select#subject-input").append(
              `<option value="${sub.ID}">${sub.Ten}</option>`
            );
          }
        }
      } else {
        console.log(res.message);
      }
    });
  }


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
    if (
      $("select#class-input").val() &&
      $("select#subject-input").val() &&
      $("select#term-input").val()
    ) {
      $.get("/api/transcript", {
        class: $("select#class-input").val(),
        subject: $("select#subject-input").val(),
        term: $("select#term-input").val(),
      }).done(function (res) {
        const transcript = res.transcript;
        if (res) {
          table.clear().draw();
          for (let i = 0; i < transcript.length; i++) {
            table.row
              .add([
                i + 1,
                `<div id="${transcript[i].ID}-studentName">${transcript[i].HoTen}</div>`,
                `<input class="w-100 text-center score" type="number" id="row-${
                  i + 1
                }-d15" name="d15p" fullName="Điểm 15 phút" value="${
                  transcript[i].Diem15Phut
                }" step="0.25" min="0" max="10" data-id="${transcript[i].ID}">`,
                `<input class="w-100 text-center score" type="number" id="row-${
                  i + 1
                }-d1t" name="d1t" fullName="Điểm 1 tiết" value="${
                  transcript[i].Diem1Tiet
                }" step="0.25" min="0" max="10" data-id="${transcript[i].ID}">`,
                `<input class="w-100 text-center score" type="number" id="row-${
                  i + 1
                }-dck" name="dck" fullName="Điểm cuối kỳ" value="${
                  transcript[i].DiemCuoiKy
                }" step="0.25" min="0" max="10" data-id="${transcript[i].ID}">`,
              ])
              .draw(false);
          }
        } else {
          console.log("error...ajax");
        }
      });
    }
  });

  $("#transcript-table").on("change", "input.score", function (event) {
    const id = $(this).attr("data-id");
    const score = {
      d15p: $(`[data-id="${id}"][name="d15p"]`).val(),
      d1t: $(`[data-id="${id}"][name="d1t"]`).val(),
      dck: $(`[data-id="${id}"][name="dck"]`).val(),
    };
    $.post(`api/transcript/${id}?_method=PUT`, score).done((res) => {
      if (res) {
        if (res.status == 200) {
          cuteToast({
            type: "success",
            title: "Thành công",
            message: `Bạn vừa cập nhật "${$(this).attr(
              "fullName"
            )}" của học sinh "${$(
              "#" + $(this).attr("data-id") + "-studentName"
            ).text()}"`,
          });
        } else if ((res.status = 400)) {
          cuteToast({
            type: "warning",
            title: "Cẩn trọng",
            message: res.message,
          });
        }
      } else {
        cuteToast({
          type: "Error",
          title: "Xảy ra lỗi",
          message: null,
        });
        console.log("error...ajax");
      }
    });
  });

  $("#rule-table").on("change", ".rule-input", async function (event) {
    console.log($(this).val());
    $.post(`/rule/${$(this).attr("data-id")}?_method=PUT`, {
      value: $(this).val(),
      dataType: $(this).attr("data-type"),
    }).done(async (res) => {
      // console.log(res.message);
      if (res) {
        if (res.status == 200) {
          cuteToast({
            type: "success",
            title: "Thành công",
            message: `Bạn vừa cập nhật "${$(
              "#" + $(this).attr("id") + "-name"
            ).text()}" thành công`,
          });
        } else if ((res.status = 400)) {
          console.log(res.message);
          cuteToast({
            type: "warning",
            title: "Cẩn trọng",
            message: res.message,
          });
        }
      } else {
        cuteToast({
          type: "error",
          message: "ERROR",
          timer: 10000,
        });
        console.log("error...ajax");
      }
    });
  });

  $.get("/api/rule/all", { level: "short" }).done((res) => {
    if (res) {
      // console.log(res.rules);
      $("select.multiple-select").select2({
        maximumSelectionLength: res.rules.MaxNumberStudentsPerClass,
        width: "resolve",
        closeOnSelect: false,
      });
    } else {
      console.log("error...ajax");
      $("select.multiple-select").select2({
        maximumSelectionLength: 40,
        width: "resolve",
        closeOnSelect: false,
      });
    }
  });
});