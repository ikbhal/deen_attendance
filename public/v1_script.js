$(document).ready(function() {
    const days = 40;
    const namaazNames = ['Subah', 'Zuhr', 'Asr', 'Magrib', 'Isha']; // Namaaz names
    const attendanceTable = $("#attendance-table");
  
    // Initialize the table rows and cells
    for (let day = 1; day <= days; day++) {
      const newRow = $("<tr></tr>");
      newRow.append(`<td>${day}</td>`);
  
      for (let i = 0; i < 5; i++) {
        const namaazName = namaazNames[i]; // Get the Namaaz name
        newRow.append(`<td>
          <label for="day${day}-namaaz${i}">${namaazName}</label>
          <select id="day${day}-namaaz${i}" class="form-control">
            <option value="any-time-any-place">Any Time, Any Place</option>
            <option value="fixed-time-any-place">Fixed Time, Any Place</option>
            <option value="fixed-time-masjid">Fixed Time, Masjid</option>
            <option value="fixed-time-imaam">Fixed Time, Imaam</option>
            <option value="fixed-time-imaam-saathi">Fixed Time, Imaam + Saathi</option>
          </select>
        </td>`);
      }
  
      attendanceTable.append(newRow);
    }
  
    // Load saved attendance from local storage
    loadAttendance();
  
    // Save attendance to local storage when a selection is changed
    $("select").change(function() {
      const rowId = $(this).attr("id");
      const attendanceValue = $(this).val();
      localStorage.setItem(rowId, attendanceValue);
    });
  });
  
  function loadAttendance() {
    let days = 40;
    for (let day = 1; day <= days; day++) {
      for (let i = 0; i < 5; i++) {
        const rowId = `day${day}-namaaz${i}`;
        const savedValue = localStorage.getItem(rowId);
  
        if (savedValue) {
          $(`#${rowId}`).val(savedValue);
        }
      }
    }
  }
  