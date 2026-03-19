function hitung() {
  let modal = parseInt(document.getElementById("modal").value) || 0;
  let jual = parseInt(document.getElementById("jual").value) || 0;
  let jumlah = parseInt(document.getElementById("jumlah").value) || 0;

  let untung = (jual - modal) * jumlah;

  document.getElementById("hasil").innerText = "Untung: Rp " + untung;

  // simpan ke HP (biar ga hilang)
  localStorage.setItem("untung", untung);
}

// saat app dibuka ulang
window.onload = function() {
  let data = localStorage.getItem("untung");
  if (data) {
    document.getElementById("hasil").innerText = "Untung: Rp " + data;
  }
};