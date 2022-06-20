$(document).ready(function () {
  if ($("form").length) {
    const validation = new JustValidate("form", {
      errorFieldCssClass: "is-invalid",
      errorLabelCssClass: "is-label-invalid",
      errorLabelStyle: {
        color: "red",
        textDecoration: "underlined",
      },
      successFieldCssClass: "is-valid",
      focusInvalidField: true,
      // lockForm: true,
      errorContainer: ".errors-container",
    });

    if ($("#code-input").length) {
      validation.addField("#code-input", [
        {
          rule: "required",
          errorMessage: "Mã học sinh là bắt buộc",
        },
        {
          // rule: 'not-duplicated',
          validator: (value) => {
            let result = true;
            $.ajax({
              type: "GET",
              url: "/api/student/all",
              async: false,
              success: function (res) {
                if (res.success) {
                  let existed = res.students.filter(
                    (student) => student.MaSo == value
                  );
                  if (existed.length) {
                    result = false;
                  }
                } else {
                  console.error(res.message);
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.error(
                  "Request: " +
                    JSON.stringify(XMLHttpRequest) +
                    "\n\nStatus: " +
                    textStatus +
                    "\n\nError: " +
                    errorThrown
                );
              },
            });
            return result;
          },
          errorMessage: "Mã học sinh đã tồn tại",
        },
      ]);
    }

    if ($("#name-input").length) {
      validation.addField("#name-input", [
        {
          rule: "minLength",
          value: 3,
          errorMessage: `Họ tên phải chứa ít nhất 3 ký tự`,
        },
        {
          rule: "maxLength",
          value: 30,
          errorMessage: "Họ tên chỉ chứa tối đa 30 ký tự",
        },
        {
          rule: "required",
          errorMessage: "Họ tên là bắt buộc",
        },
      ]);
    }

    if ($("#birthday-input").length) {
      validation.addField("#birthday-input", [
        {
          rule: "required",
          errorMessage: "Vui lòng chọn ngày sinh.",
        },
      ]);
    }

    if ($("#gender-input").length) {
      validation.addField("#gender-input", [
        {
          rule: "required",
          errorMessage: "Vui lòng chọn giới tính của bạn",
        },
      ]);
    }

    if ($("#email-input").length) {
      validation.addField("#email-input", [
        {
          rule: "email",
          errorMessage: "Email không hợp lệ",
        },
      ]);
    }

    if($("#grade-input").length) {
        validation.addField("#grade-input", [
            {
                rule: "required",
                errorMessage: "Vui lòng chọn Khối"
            }
        ])
    }

    if($("#students-input").length) {
        validation.addField("#students-input", [
            {
                rule: "required",
                errorMessage: "Vui lòng chọn các học sinh",
            }
        ])
    }

    if($("#class-name-input").length) {
        validation.addField("#class-name-input", [
            {
                rule: "required",
                errorMessage: "Vui lòng nhập tên lớp",
            }
        ])
    }

    if ($("#subject-code-input").length) {
        validation.addField("#subject-code-input", [
          {
            rule: "required",
            errorMessage: "Vui lòng nhập Mã môn học (VD: 1000)",
          },
          {
            // rule: 'not-duplicated',
            validator: (value) => {
              let result = true;
              $.ajax({
                type: "GET",
                url: "/api/subject/all",
                async: false,
                success: function (res) {
                  if (res.success) {
                    let existed = res.subjects.filter(
                      (student) => student.MaBM == value
                    );
                    if (existed.length) {
                      result = false;
                    }
                  } else {
                    console.error(res.message);
                  }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                  console.error(
                    "Request: " +
                      JSON.stringify(XMLHttpRequest) +
                      "\n\nStatus: " +
                      textStatus +
                      "\n\nError: " +
                      errorThrown
                  );
                },
              });
              return result;
            },
            errorMessage: "Mã môn học đã tồn tại",
          },
        ]);
      }
      
      if($("#subject-name-input").length) {
        validation.addField("#subject-name-input", [
            {
                rule: "required",
                errorMessage: "Vui lòng nhập tên môn học (VD: Tiếng Đức)",
            }
        ])
    }

    if($("#term-input").length) {
      validation.addField("#term-input", [
          {
              rule: "required",
              errorMessage: "Vui lòng chọn học kỳ.",
          }
      ])
  }




    validation.onSuccess((event) => {
      console.log("Validation passes and form submitted", event);
      $(event.target).submit();
    });

    validation.onFail((fields) => {
      console.log("Validation not passes and form not submitted", fields);
    });

    $("input, select, textarea").on("change input", function (event) {
      validation.revalidateField(`#${$(this).attr("id")}`);
    });
  }
});
