$(document).ready(function () {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (user || token) {

    if (JSON.parse(user).role == "ADMIN")
      window.location.href = "/Frontend/Admin/Admin.html";
    else if (JSON.parse(user).role == "PATIENT") {
      window.location.href = "/Frontend/Patient/Patient.html";
    } else if (JSON.parse(user).role == "DOCTOR") {
      window.location.href = "/Frontend/Doctor/Doctor.html";
    }
  }

  $("#login-form").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var username = $("#username").val();
    var password = $("#password").val();
    console.log(username);
    console.log(password);

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
    });
  });

  $("#signup-form").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var name = $("#Name").val();
    var email = $("#email").val();
    var role = $("#role").val();
    var password = $("#password").val();

    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/auth/register",
      dataType: "json",
      contentType: "application/json",
      data: data,
      // serializes the form's elements.
      success: function (data) {
        alert(" User Registered Sucessfully Please Login to Proceed");
        window.location.replace("/Frontend/login.html");
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", data.user);
        // if (data.user.role == "ADMIN") {
        //   window.location.replace("/Frontend/admin/Admin.html");
        // }
        // if (data.user.role == "PATIENT") {
        //   window.location.replace("/Frontend/patient/Patient.html");
        // }
        // show response from the php script.
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });
});
