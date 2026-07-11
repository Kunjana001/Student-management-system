/* ==========================================================
   Student Management System
   Settings.script.js

   Purpose:

   Controls the Settings page: the Back button and the Dark
   Mode / Light Mode switch. The actual theme-switching logic
   lives in common/theme.js (ThemeManager) so it is not
   duplicated here, as required by Task 6.

   Version: 1.0
   ========================================================== */

"use strict";

/* ==========================================================
   Get HTML Elements
   ========================================================== */

var btnBack = document.getElementById("btnBack");

var themeGrid = document.getElementById("theme_grid");



/* ==========================================================
   Start Settings Page
   ========================================================== */

initializeSettingsPage();



/* ==========================================================
   Initialize Settings Page

   Checks that the user is logged in, then wires up the
   Back button and builds one swatch button per theme in
   ThemeManager.ALL_THEMES.
   ========================================================== */

function initializeSettingsPage()
{
    if (Session.requireLogin() === false)
    {
        return;
    }

    btnBack.onclick = goProfile;

    renderThemeGrid();
}



/* ==========================================================
   Render the Theme Swatch Grid

   One button per theme, with a small color swatch, the theme
   name, and a checkmark on whichever one is currently active.
   Re-drawn after every selection so the checkmark always moves
   to match ThemeManager's current theme.
   ========================================================== */

function renderThemeGrid()
{
    var strCurrentTheme = ThemeManager.getCurrentTheme();

    themeGrid.innerHTML = "";

    ThemeManager.ALL_THEMES.forEach(function (objTheme)
    {
        var bIsActive = (objTheme.id === strCurrentTheme);

        var btnTheme = document.createElement("button");
        btnTheme.type = "button";
        btnTheme.className = "theme-swatch-btn" + (bIsActive === true ? " theme-swatch-active" : "");
        btnTheme.setAttribute("data-theme-id", objTheme.id);

        btnTheme.innerHTML =
            "<span class=\"theme-swatch-color\" style=\"background:" + objTheme.swatch + "\">" +
                (bIsActive === true ? "<i class=\"fa-solid fa-check\"></i>" : "") +
            "</span>" +
            "<span class=\"theme-swatch-label\">" + objTheme.label + "</span>";

        btnTheme.onclick = function ()
        {
            handleThemeSelected(objTheme.id);
        };

        themeGrid.appendChild(btnTheme);
    });
}



/* ==========================================================
   Handle a Theme Being Selected

   Tells ThemeManager to apply + persist the chosen theme (it
   updates the page immediately, no reload needed, and saves
   the choice to LocalStorage), then redraws the grid so the
   checkmark moves to the new selection.
   ========================================================== */

function handleThemeSelected(strThemeId)
{
    ThemeManager.applyTheme(strThemeId);

    renderThemeGrid();

    if (typeof CommonUtils !== "undefined")
    {
        CommonUtils.showToast("Theme updated.", "success");
    }
}
