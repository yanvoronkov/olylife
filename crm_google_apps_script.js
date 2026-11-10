/**
 * OlyLife CRM — Google Apps Script (минимальный)
 *
 * Единственная задача: защита формулы автонумерации в ячейке A2.
 * Формула: =ARRAYFORMULA(IF(B2:B<>""; ROW(B2:B)-1; ""))
 *
 * Всё остальное (запись лидов, Telegram, Meta CAPI) — делает n8n.
 */

const SHEET_NAME = 'Leads';
const NUMBERING_FORMULA = '=ARRAYFORMULA(IF(B2:B<>""; ROW(B2:B)-1; ""))';

/**
 * Восстанавливает формулу автонумерации в A2, если она была случайно удалена.
 * Вызывается триггером onChange (тип: ON_CHANGE).
 */
function restoreNumberingFormula() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const a2 = sheet.getRange('A2');
  if (!a2.getFormula()) {
    a2.setFormula(NUMBERING_FORMULA);
  }
}

/**
 * Устанавливает триггер onChange для защиты формулы автонумерации.
 * Запустить один раз вручную из редактора GAS.
 */
function installTrigger() {
  // Удаляем старые триггеры, чтобы не дублировать
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'restoreNumberingFormula') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('restoreNumberingFormula')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();

  SpreadsheetApp.getUi().alert('✅ Триггер установлен. Формула A2 будет восстанавливаться автоматически.');
}
