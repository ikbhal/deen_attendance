$(document).ready(function() {
    const days = 40;
    const namaazNames = ['Subah', 'Zuhr', 'Asr', 'Magrib', 'Isha'];
    const attendanceTable = $("#attendance-table");
  
    // Initialize the table rows and cells
    for (let day = 1; day <= days; day++) {
      const newRow = $("<tr></tr>");
      newRow.append(`<td>${day}</td>`);
  
      for (let i = 0; i < 5; i++) {
        const namaazName = namaazNames[i];
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
  
    // Load saved attendance from the server
    loadAttendance();
  
    // Save attendance to the server when a selection is changed
    $("select").change(function() {
      const rowId = $(this).attr("id");
      const attendanceValue = $(this).val();
      const [day, namaazIndex] = rowId.match(/\d+/g);
  
      // Call the API to set attendance data
      setAttendance(day, namaazIndex, attendanceValue);
    });
  });
  
  function loadAttendance() {
    for (let day = 1; day <= days; day++) {
      for (let i = 0; i < 5; i++) {
        const rowId = `day${day}-namaaz${i}`;
  
        // Call the API to get attendance data
        getAttendance(day, i, rowId);
      }
    }
  }
  


  function setAttendance(day, namaazIndex, value) {
    // Use AJAX or fetch to call the API and set attendance
    // Example using jQuery AJAX:
    $.post('/set', { key: `day${day}-namaaz${namaazIndex}`, value }, (data) => {
      console.log(data);
    });
  }
  
  
  function getAttendance(day, namaazIndex, rowId) {
    // Use AJAX or fetch to call the API and get attendance
    // Example using jQuery AJAX:
    $.get(`/get/day${day}-namaaz${namaazIndex}`, (data) => {
      $(`#${rowId}`).val(data.value);
    });
  }
  