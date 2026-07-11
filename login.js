/* ==========================================================
   Student Management System
   Login JavaScript
   ========================================================== */


/* ==========================================================
   Get HTML Elements
   ========================================================== */

var txtUsername = document.getElementById("username");
var txtPassword = document.getElementById("password");

var btnLogin = document.getElementById("loginBtn");

var btnSignup = document.getElementById("signupBtn");

var btnEye = document.getElementById("togglePassword");

var lblLoginTitle = document.getElementById("loginTitle");
var lblLoginSubtitle = document.getElementById("loginSubtitle");


/* ==========================================================
   Page Text

   Title / subtitle now come from AppConfig.TEXT instead of
   being hardcoded in login.html.
   ========================================================== */

lblLoginTitle.textContent = AppConfig.TEXT.login.title;
lblLoginSubtitle.textContent = AppConfig.TEXT.login.subtitle;


/* ==========================================================
   Register Events
   ========================================================== */

btnEye.onclick = togglePassword;

btnLogin.onclick = loginUser;

btnSignup.onclick = goSignup;


/* ==========================================================
   Show / Hide Password
   ========================================================== */

function togglePassword()
{
    if (txtPassword.type === "password")
    {
        txtPassword.type = "text";

        btnEye.classList.remove("fa-eye");
        btnEye.classList.add("fa-eye-slash");
    }
    else
    {
        txtPassword.type = "password";

        btnEye.classList.remove("fa-eye-slash");
        btnEye.classList.add("fa-eye");
    }
}


/* ==========================================================
   Login User
   ========================================================== */

function loginUser()
{
    var strUsername = txtUsername.value.trim();

    var strPassword = txtPassword.value.trim();


    /* ---------- Validation ---------- */

    if (strUsername === "")
    {
        alert("Please enter your username.");

        txtUsername.focus();

        return;
    }

    if (strPassword === "")
    {
        alert("Please enter your password.");

        txtPassword.focus();

        return;
    }


    /* --------------------------------------------------
       CONNECTION FIX - WHY / WHAT / WHEN

       WHY: this used to call Session.login(strUsername) and
       declare success unconditionally - it never checked the
       Users sheet, so any username/password "worked".
       WHAT: asks DataService to log in against the real Google
       Apps Script backend (Login.gs), and only calls
       Session.login() / goDashboard() if the backend confirms
       the username and password are correct.
       WHEN: runs when the user taps the Login button.
       -------------------------------------------------- */

    showLoader("Logging in...");

    DataService.login(strUsername, strPassword, function (objUser)
    {
        hideLoader();

        Session.login(objUser.username);

        CommonUtils.showAlert("Login Successful!");

        goDashboard();
    },
    function (objError)
    {
        hideLoader();

        console.log(objError);

        CommonUtils.showAlert((objError && objError.message) || "Invalid Username or Password.");
    });
}