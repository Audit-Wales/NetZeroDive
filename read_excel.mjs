import XLSX from 'xlsx';
const wb = XLSX.readFile('Welsh_Public_Sector_Net_Zero_2025_with_Insights (1).xlsx');
for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  console.log(`=== Sheet: ${name} (${data.length} rows) ===`);
  data.slice(0, 8).forEach(r => console.log(JSON.stringify(r)));
  console.log();
}
