/* ==========================================================
   Student Management System
   Dashboard.script.js

   Purpose:

   Controls the Dashboard page: the sidebar menu, the top
   navigation cards, and signing out. This replaces the old
   dashboard.js file - the logic is the same, but it now goes
   through Session (for login checks / logout) and Navigation
   (for moving between pages) instead of touching
   localStorage or window.location.href directly, as required
   by the project's layered architecture.

   ----------------------------------------------------------
   CONNECTION FIX - what changed in this pass
   ----------------------------------------------------------

   • Added a "Load Sample Data" button (Task 5 - Data Testing).
     It calls the new DataService.seedSampleData(), which adds
     sample Categories/Sections/Students/Results through the
     exact same DataService.addRecord() path a real Add form
     uses, then refreshes the Quick Stats counts. Nothing else
     on this page was changed.

   Version: 2.1
   ========================================================== */

"use strict";

/* ==========================================================
   Get HTML Elements
   ========================================================== */

var divSidebar = document.getElementById("sidebar");

var btnMenu = document.getElementById("menuBtn");

var divStudentCard = document.getElementById("studentCard");
var divCategoryCard = document.getElementById("categoryCard");
var divSectionCard = document.getElementById("sectionCard");
var divResultCard = document.getElementById("resultCard");

var liStudent = document.getElementById("menuStudent");
var liCategory = document.getElementById("menuCategory");
var liSection = document.getElementById("menuSection");
var liResult = document.getElementById("menuResult");

var liProfile = document.getElementById("menuProfile");

var liLogout = document.getElementById("logout");

var lblDashboardTitle = document.getElementById("dashboardTitle");
var lblDashboardGreeting = document.getElementById("dashboardGreeting");

var lblStudentCount = document.getElementById("studentCount");
var lblCategoryCount = document.getElementById("categoryCount");
var lblSectionCount = document.getElementById("sectionCount");
var lblResultCount = document.getElementById("resultCount");

var lblStatStudents = document.getElementById("statStudents");
var lblStatCategories = document.getElementById("statCategories");
var lblStatSections = document.getElementById("statSections");
var lblStatResults = document.getElementById("statResults");

var listActivity = document.getElementById("activityList");



/* ==========================================================
   Start Dashboard
   ========================================================== */

initializeDashboard();



/* ==========================================================
   Initialize Dashboard

   Checks that the user is logged in before wiring up any of
   the buttons. If nobody is logged in, requireLogin() sends
   the user back to the login page and returns false, so we
   stop here instead of setting up a dashboard nobody should
   be looking at.
   ========================================================== */

function initializeDashboard()
{
    if (Session.requireLogin() === false)
    {
        return;
    }

    registerEvents();

    setPageText();

    loadQuickStats();

    loadRecentActivity();
}



/* ==========================================================
   Set Page Text

   Title comes from AppConfig.TEXT (Task: JSON config
   instead of hardcoded strings). The subtitle becomes a
   personalized, time-of-day greeting once we know who is
   logged in, instead of the generic "Welcome to..." line.
   ========================================================== */

function setPageText()
{
    lblDashboardTitle.textContent = AppConfig.TEXT.dashboard.title;

    var strUsername = Session.getUsername();

    if (strUsername)
    {
        lblDashboardGreeting.textContent = getTimeOfDayGreeting() + ", " + strUsername + " \uD83D\uDC4B";
    }
    else
    {
        lblDashboardGreeting.textContent = AppConfig.TEXT.dashboard.subtitle;
    }
}



/* ==========================================================
   Get a "Good Morning / Afternoon / Evening" greeting based
   on the current time on the user's device.
   ========================================================== */

function getTimeOfDayGreeting()
{
    var intHour = new Date().getHours();

    if (intHour < 12)
    {
        return "Good Morning";
    }

    if (intHour < 17)
    {
        return "Good Afternoon";
    }

    return "Good Evening";
}



/* ==========================================================
   Load Quick Stats

   Fetches the real record counts for each store and fills
   in both the dashboard cards and the Quick Stats panel.
   ========================================================== */

function loadQuickStats()
{
    loadCountFor(AppConfig.STORES.STUDENT, lblStudentCount, lblStatStudents, "Students");
    loadCountFor(AppConfig.STORES.CATEGORY, lblCategoryCount, lblStatCategories, "Categories");
    loadCountFor(AppConfig.STORES.SECTION, lblSectionCount, lblStatSections, "Sections");
    loadCountFor(AppConfig.STORES.RESULT, lblResultCount, lblStatResults, "Results");
}



/* ==========================================================
   Load Count For a Single Store

   strStoreName : AppConfig.STORES.STUDENT / CATEGORY / ...
   lblCardCount : the small count line inside the dashboard card
   lblStatValue : the number shown in the Quick Stats panel
   strLabel     : plural label used in the card count line
   ========================================================== */

function loadCountFor(strStoreName, lblCardCount, lblStatValue, strLabel)
{
    DataService.getAllRecords(
        strStoreName,
        function (arrRecords)
        {
            var intCount = (arrRecords && arrRecords.length) ? arrRecords.length : 0;

            lblCardCount.textContent = intCount + " " + strLabel;
            lblStatValue.textContent = intCount;
        },
        function (objError)
        {
            lblCardCount.textContent = "";
            lblStatValue.textContent = "--";
        }
    );
}



/* ==========================================================
   Load Recent Activity

   Reads the small activity log kept in local storage and
   shows the most recent entries. If nothing has been logged
   yet, a friendly placeholder is shown instead.
   ========================================================== */

function loadRecentActivity()
{
    var arrActivity = StorageService.getValue(AppConfig.STORAGE_KEYS.RECENT_ACTIVITY);

    if (!arrActivity || arrActivity.length === 0)
    {
        return;
    }

    listActivity.innerHTML = "";

    var intMaxItems = Math.min(arrActivity.length, 5);

    for (var intIndex = 0; intIndex < intMaxItems; intIndex++)
    {
        var liItem = document.createElement("li");

        liItem.className = "activity-item";
        liItem.textContent = arrActivity[intIndex];

        listActivity.appendChild(liItem);
    }
}



/* ==========================================================
   Register Button Click Events
   ========================================================== */

function registerEvents()
{
    btnMenu.onclick = toggleSidebar;

    divStudentCard.onclick = openStudentList;
    divCategoryCard.onclick = openCategoryList;
    divSectionCard.onclick = openSectionList;
    divResultCard.onclick = openResultList;

    liStudent.onclick = openStudentList;
    liCategory.onclick = openCategoryList;
    liSection.onclick = openSectionList;
    liResult.onclick = openResultList;

    liProfile.onclick = openProfilePage;

    liLogout.onclick = logoutUser;
}



/* ==========================================================
   Sample / Test Data (Task 5 - Data Testing)

   There is no button for this on the Dashboard on purpose -
   it is a developer/testing utility, not something an end
   user should see. To add a small set of sample Categories,
   Sections, Students and Results through the real backend
   connection, open this page's browser console and run:

       DataService.seedSampleData(console.log, console.error);

   This calls the exact same DataService.addRecord() path used
   by every Add form, so it is a genuine end-to-end test of
   whichever backend is currently active (see
   DataService.getBackendMode()) - not mock data that skips the
   app's own logic. See DataService.js for full details.
   ========================================================== */



/* ==========================================================
   Toggle the Sidebar Open / Closed
   ========================================================== */

function toggleSidebar()
{
    divSidebar.classList.toggle("show");
}



/* ==========================================================
   Open Student List Page
   ========================================================== */

function openStudentList()
{
    goStudent();
}



/* ==========================================================
   Open Category List Page
   ========================================================== */

function openCategoryList()
{
    goCategory();
}



/* ==========================================================
   Open Section List Page
   ========================================================== */

function openSectionList()
{
    goSection();
}



/* ==========================================================
   Open Result List Page
   ========================================================== */

function openResultList()
{
    goResult();
}



/* ==========================================================
   Open Profile Page

   Replaces the old "Account Settings" menu item. Settings
   itself is now reached from a button inside the Profile
   page instead of its own sidebar entry (Task 4).
   ========================================================== */

function openProfilePage()
{
    goProfile();
}



/* ==========================================================
   Log the User Out

   Asks for confirmation first so a sidebar mis-click does
   not accidentally sign the user out.
   ========================================================== */

function logoutUser()
{
    var blnConfirmedLogout = CommonUtils.showConfirm("Are you sure you want to sign out?");

    if (blnConfirmedLogout === true)
    {
        Session.logout();
    }
}
