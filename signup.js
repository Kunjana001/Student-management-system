/* ==========================================================
   Student Management System
   Sign Up JavaScript
   ========================================================== */


/* ==========================================================
   Get HTML Elements
   ========================================================== */

var txtUsername = document.getElementById("username");
var txtPassword = document.getElementById("password");
var txtConfirmPassword = document.getElementById("confirmPassword");

var btnCreateAccount = document.getElementById("createAccountBtn");
var btnBackToLogin = document.getElementById("backToLoginBtn");

var btnEye = document.getElementById("togglePassword");
var btnConfirmEye = document.getElementById("toggleConfirmPassword");

var lblSignupTitle = document.getElementById("signupTitle");
var lblSignupSubtitle = document.getElementById("signupSubtitle");


/* ==========================================================
   Page Text

   Title / subtitle now come from AppConfig.TEXT instead of
   being hardcoded in signup.html.
   ========================================================== */

lblSignupTitle.textContent = AppConfig.TEXT.signup.title;
lblSignupSubtitle.textContent = AppConfig.TEXT.signup.subtitle;


/* ==========================================================
   Register Events
   ========================================================== */

btnEye.onclick = togglePassword;

btnConfirmEye.onclick = toggleConfirmPassword;

btnCreateAccount.onclick = createAccount;

btnBackToLogin.onclick = goLogin;


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
   Show / Hide Confirm Password
   ========================================================== */

function toggleConfirmPassword()
{
    if (txtConfirmPassword.type === "password")
    {
        txtConfirmPassword.type = "text";

        btnConfirmEye.classList.remove("fa-eye");
        btnConfirmEye.classList.add("fa-eye-slash");
    }
    else
    {
        txtConfirmPassword.type = "password";

        btnConfirmEye.classList.remove("fa-eye-slash");
        btnConfirmEye.classList.add("fa-eye");
    }
}


/* ==========================================================
   Create Account
   ========================================================== */

function createAccount()
{
    var strUsername = txtUsername.value.trim();

    var strPassword = txtPassword.value.trim();

    var strConfirmPassword = txtConfirmPassword.value.trim();


    /* ---------- Validation ---------- */

    if (strUsername === "")
    {
        alert("Please choose a username.");

        txtUsername.focus();

        return;
    }

    if (strPassword === "")
    {
        alert("Please choose a password.");

        txtPassword.focus();

        return;
    }

    if (strConfirmPassword === "")
    {
        alert("Please confirm your password.");

        txtConfirmPassword.focus();

        return;
    }

    if (strPassword !== strConfirmPassword)
    {
        alert("Passwords do not match.");

        txtConfirmPassword.focus();

        return;
    }


    /* ======================================================
       Temporary Sign Up

       This is a placeholder only - it does not yet create a
       real account on a backend server. Replace this later
       with a real Google Apps Script "create account" call.
       Once that exists, this is the only function that will
       need to change, because the rest of the app (Login,
       Dashboard, every other page) only ever talks to
       Session and Navigation, never directly to storage or
       to window.location.href.
       ====================================================== */

    CommonUtils.showAlert("Account created! Please log in.");

    goLogin();
}
