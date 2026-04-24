const SHEET_URL = 'PASTE_URL_CSV_GOOGLE_SHEET_DISINI';

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => renderTable(csv));

function renderTable(csv) {
  const rows = csv.split('\n').map(r => r.split(','));
  const table = document.getElementById('absensi-table');

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    row.forEach((cell, colIndex) => {
      const td = rowIndex === 0
        ? document.createElement('th')
        : document.createElement('td');

      const value = cell.trim();
      td.textContent = value;

      if (['H','I','C','S','A'].includes(value)) {
        td.classList.add(value.toLowerCase());
      }

      if (rowIndex === 0 && value.toLowerCase().includes('minggu')) {
        td.classList.add('minggu');
      }

      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
}
