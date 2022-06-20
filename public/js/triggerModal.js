$(document).ready(function() {
   
   $("[href='#deleteModal']").on("click", function (e) {
      const objectName = $(`#${$(this).attr("data-id")}-name`).text();
      cuteAlert({
         type: "question",
         title: "Xác nhận",
         message: `Xác nhận xóa "${objectName}"`,
         confirmText: "Đồng ý",
         cancelText: "Hủy bỏ",
         closeStyle: "circle",
      }).then(async (e) => {
         if(e == 'confirm') {
            $.post($(this).attr("action"))
            .done((res) => {
               if(res.success) {
                  cuteAlert({
                     type: "success",
                     title: "Thành công",
                     message: `Bạn đã xóa "${objectName}"`,
                     closeStyle: "circle",
                  }).then(async () => {
                     window.location.reload();
                  })
               } else {
                  cuteAlert({
                     type: "error",
                     title: "Thất bại",
                     message: `Không thể xóa "${objectName}"`,
                     closeStyle: "circle",
                  })
               }
            })
         } else {
            // alert("cancel");
         }
      })
   });



})