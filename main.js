const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzl6jOLHAiwYux6qEl-4SfBLWvAiqA5PDEoSLAK6KrqRye_ecMT7o6mTBbCKt41g/pub?gid=30156212&single=true&output=csv';

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
