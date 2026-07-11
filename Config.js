/* ==========================================================
   Student Management System
   Config.js

   Purpose:
   Stores all application configuration in one place.

   Version: 1.0
   ========================================================== */

"use strict";

/* ==========================================================
   Application Configuration
   ========================================================== */

const AppConfig = {

    /* ======================================================
       Application Details
       ====================================================== */

    APP_NAME: "Student Management System",

    APP_VERSION: "1.0.0",

    APP_THEME_COLOR: "#123b8d",



    /* ======================================================
       UI Text

       All page titles / subtitles / headings live here
       instead of being hardcoded in the HTML, so the same
       wording only has to change in one place.
       ====================================================== */

    TEXT: {

        login: {
            title: "Login",
            subtitle: "Welcome to Student Management System"
        },

        signup: {
            title: "Sign Up",
            subtitle: "Create your Student Management System account"
        },

        dashboard: {
            title: "Dashboard",
            subtitle: "Welcome to Student Management System"
        },

        student: {
            title: "Student List"
        },

        category: {
            title: "Category List"
        },

        section: {
            title: "Section List"
        },

        result: {
            title: "Result List"
        }

    },



    /* ======================================================
       Backend Modes
       ====================================================== */

    BACKEND_MODE: "GOOGLE",

    BACKEND: {

        GOOGLE: "GOOGLE",

        OFFLINE: "OFFLINE",

        SPRING: "SPRING"

    },



    /* ======================================================
       Google Apps Script
       ====================================================== */

    GOOGLE_SCRIPT_URL:

        "https://script.google.com/macros/s/AKfycbwlmLclX-fCV6Fyn8H9g9mu3n3M-gwzBqMDQYxFGaC8LAN5XwcLMG_5655dIHjjTapoew/exec",



 /* ======================================================
   API Configuration
====================================================== */

API: {

    DEFAULT_PAGE_SIZE: 10,

    REQUEST_TIMEOUT: 30000,

    SEARCH_DELAY: 300

},

    /* ======================================================
       Future Spring Boot URL
       ====================================================== */

    SPRING_BOOT_URL:

        "",



    /* ======================================================
       Local Database
       ====================================================== */

    DATABASE_NAME:

        "StudentManagementDB",

    DATABASE_VERSION:

        1,



    /* ======================================================
       Object Stores
       ====================================================== */

    STORES: {

        STUDENT: "Students",

        CATEGORY: "Categories",

        SECTION: "Sections",

        RESULT: "Results",

        USER: "Users",

        /* --------------------------------------------------
           Holds offline changes (add / update / delete) that
           are waiting to be pushed to the real backend once
           the device is back online.
           -------------------------------------------------- */

        SYNC_QUEUE: "SyncQueue"

    },


    /* ======================================================
   Network
====================================================== */

NETWORK: {

    ONLINE: "ONLINE",

    OFFLINE: "OFFLINE"

},


    /* ======================================================
       Offline Sync Settings

       Used by StorageService / DataService to control how
       often we retry sending queued changes to the backend.
       ====================================================== */

    SYNC_RETRY_INTERVAL_MS:

        30000,


/* ======================================================
   Cache Keys
====================================================== */

CACHE_KEYS: {

    STUDENTS: "cache_students",

    CATEGORIES: "cache_categories",

    SECTIONS: "cache_sections",

    RESULTS: "cache_results"

},




    /* ======================================================
       Session Keys
       ====================================================== */

    STORAGE_KEYS: {

        LOGIN:

            "loggedIn",

        USERNAME:

            "username",

        TOKEN:

            "token",

        BACKEND:

            "backend",

        LAST_SYNC:

            "lastSync",

        /* --------------------------------------------------
           Remembers whether the user chose Light Mode or
           Dark Mode, so theme.js can restore it on every
           page. See Task 6.
           -------------------------------------------------- */

        THEME:

            "theme",

        /* --------------------------------------------------
           Login / Logout history shown on the Profile page.
           See Task 5.
           -------------------------------------------------- */

        CURRENT_LOGIN_TIME:

            "currentLoginTime",

        PREVIOUS_LOGIN_TIME:

            "previousLoginTime",

        LAST_LOGOUT_TIME:

            "lastLogoutTime",

        /* --------------------------------------------------
           Small list of the most recent add / edit / delete
           actions, shown on the Dashboard "Recent Activity"
           card.
           -------------------------------------------------- */

        RECENT_ACTIVITY:

            "recentActivity"

    },
  /* ======================================================
   Network
  ====================================================== */

  NETWORK: {

     ONLINE: "ONLINE",

     OFFLINE: "OFFLINE"

}
};