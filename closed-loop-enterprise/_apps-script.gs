/**
 * Pre-order list backend for The Closed-Loop Enterprise sign-up page.
 *
 * Writes each sign-up (timestamp, name, email) to the first tab of the
 * spreadsheet this script is attached to. The script runs as the sheet
 * owner, so the spreadsheet itself never needs to be shared with anyone.
 *
 * Setup (once):
 *   1. Open the pre-order Google Sheet > Extensions > Apps Script.
 *   2. Replace everything in Code.gs with this file and click Save.
 *   3. Deploy > New deployment > gear icon > Web app.
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Click Deploy, authorize, and copy the Web app URL (ends in /exec).
 *   5. Put that URL in ENDPOINT in closed-loop-enterprise/app.js.
 *
 * After editing this script later, use Deploy > Manage deployments > Edit >
 * Version: New version, so the same URL keeps working.
 *
 * Jekyll skips files starting with "_", so this file is not served by the site.
 */

var HEADERS = ['Submitted at', 'Name', 'Email'];
var EMAIL_COLUMN = 3;
var MAX_NAME_LENGTH = 100;
var MAX_EMAIL_LENGTH = 254;
var MAX_SIGNUPS_PER_MINUTE = 60;
var EMAIL_PATTERN = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

function doPost(e) {
  var params = (e && e.parameter) || {};

  // Bots fill in the hidden field; tell them it worked and store nothing.
  if (params.leave_blank) return respond({ ok: true });

  var name = String(params.name || '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  var email = String(params.email || '').trim();
  if (!name || name.length > MAX_NAME_LENGTH) return respond({ ok: false, error: 'invalid_name' });
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return respond({ ok: false, error: 'invalid_email' });
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return respond({ ok: false, error: 'busy' });
  try {
    if (overRateLimit()) return respond({ ok: false, error: 'busy' });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    // Same answer for new and repeat sign-ups, so the form never reveals who is on the list.
    if (!isOnList(sheet, email)) {
      sheet.appendRow([new Date(), asText(name), asText(email)]);
      SpreadsheetApp.flush();
    }
    return respond({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return respond({ ok: true });
}

function isOnList(sheet, email) {
  var rows = sheet.getLastRow() - 1;
  if (rows < 1) return false;
  return sheet.getRange(2, EMAIL_COLUMN, rows, 1)
    .createTextFinder(email)
    .matchCase(false)
    .matchEntireCell(true)
    .findNext() !== null;
}

// Global cap on writes per minute, so a flood of fake sign-ups can't bury the sheet.
function overRateLimit() {
  var cache = CacheService.getScriptCache();
  var key = 'signups-' + Math.floor(Date.now() / 60000);
  var count = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(count), 120);
  return count > MAX_SIGNUPS_PER_MINUTE;
}

// Stops Sheets from treating input like "=IMPORTXML(...)" as a formula.
function asText(value) {
  return /^[=+\-@']/.test(value) ? "'" + value : value;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
