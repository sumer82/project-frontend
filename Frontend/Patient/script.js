$(document).ready(function () {

  // ADD ACTIVE CLASS TO SIDE MENU ITEMS ON CLICK
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  
  // Display a success message

  if (!(user && token) || (JSON.parse(user).role != "PATIENT" )) {
    alert("Please login to proceed");

    window.location.href = "/Frontend/login.html";
  } else {
    console.log(JSON.parse(user).name);
    $("#doc_name").html(JSON.parse(user).name);

    jQuery.ajax({
      url: "http://localhost:8080/api/doctors/1",
      type: "GET",
      success: function (data) {
        $("#doc_name").html(data.name);

        let html = "";
        let html2 = "";
        let count = 0;
        let total = data.appointments.length;
        for (var i = 0; i < data.appointments.length; i++) {
          if (data.appointments[i].status == "pending") {
            count++;
          }

          html += `
        <tr>
        <td>
        <p>${data.appointments[i].patient.name}</p>
        </td>
        <td>${data.appointments[i].date}</td>
        <td>${data.appointments[i].symptom}</td>
        <td><span class="status completed">${data.appointments[i].status}</span></td>
        <td>
        <button class="status completed">
        <i class="bx bx-show"></i>
        </button>
        </td>
        </tr>
        `;
          html2 = `
        <li class="completed">
        <i class="bx bx-task"></i>
        <p>Appointment</p>
        <p>${data.appointments[i].time}</p>
        </li>`;

          $("#apt_table").append(html);
        }
        let percentage = (count / total) * 100;
        $("#apt_count").html(total);
        $("#stat").html(count);
        $("#effi").html(percentage).append("%");
        $("#sch").html(html2);
        console.log(data);
      },
    });
    // $("#apt_search").click(function () {
    //   var inputDate = $("#date").val();
    //   jQuery.ajax({
    //     url: `http://localhost:8080/appointments/date?date=${inputDate}`,
    //     type: "GET",
    //     success: function (data) {
    //       let html = "";
    //       $("#apt_table").html(html);
    //       let html2 = "";

    //       let total = data.appointments.length;
    //       for (var i = 0; i < total; i++) {
    //         html += `
    //       <tr>
    //       <td>
    //       <p>{data.appointments[i].patient.name}</p>
    //       </td>
    //       <td>{data.appointments[i].date}</td>
    //       <td>{data.appointments[i].symptom}</td>
    //       <td><span class="status completed">{data.appointments[i].status}</span></td>
    //       <td>
    //       <button class="status completed">
    //       <i class="bx bx-show"></i>
    //       </button>
    //       </td>
    //       </tr>
    //       `;

    //         $("#apt_table").append(html);
    //       }
    //     },
    //   });
    // });

    $("#sidebar .side-menu.top li a").click(function (e) {
      e.preventDefault();
      $("#sidebar .side-menu.top li").removeClass("active");
      $(this).parent().addClass("active");
    });

    // TOGGLE SIDEBAR
    $("#content nav .bx.bx-menu").click(function () {
      $("#sidebar").toggleClass("hide");
    });

    // OPEN/CLOSE FORM
    $("#open-form").click(function () {
      $("#myForm").show();
    });
    $("#close-form").click(function () {
      $("#myForm").hide();
    });

    $(".add_sch").click(function () {
      $("#sch_form").show();
    });
    $("#add_sch").click(function () {
      $("#sch_form").show();
    });
    $("#close_sch").click(function () {
      $("#sch_form").hide();
    });

    // OPEN/CLOSE FORM
    $(".book_apt").click(function () {
      $("#book_form").show();
    });
    $("#apt_book").click(function () {
      $("#book_form").show();
    });
    $("#book_form_close").click(function () {
      $("#book_form").hide();
    });


     $("#book_apt_form").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var doc_id = $("#doctor_id").val();
    var paient_id = $("#patient_id").val();
     var date = $("#date").val();
     var input_datetime = new Date(date);
     console.log(input_datetime);
      var symptom = $("#symptom").val();

    console.log(date);
    console.log(symptom);

    var data = JSON.stringify({ username: username, password: password });

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/auth/login",
      dataType: "json",
      contentType: "application/json",
      data: data,
      // serializes the form's elements.
      success: function (data) {
        console.log(data);
        console.log(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role == "ADMIN") {
          window.location.replace("/Frontend/admin/Admin.html");
        }
         if (data.user.role == "DOCTOR") {
           window.location.replace("/Frontend/Doctor/Doctor.html");
         }
        if (data.user.role == "PATIENT") {
          window.location.replace("/Frontend/patient/Patient.html");
        }
        // show response from the php script.
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    })
    });

    // SWITCH DARK/LIGHT MODE
    $("#switch-mode").change(function () {
      if ($(this).is(":checked")) {
        $("body").addClass("dark");
      } else {
        $("body").removeClass("dark");
      }
    });
  }
});
