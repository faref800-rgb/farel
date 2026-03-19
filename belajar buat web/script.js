let data = JSON.parse(localStorage.getItem("dataBisnis")) || [];
let chart;

// format rupiah
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// tambah data
function tambahData() {
  let produk = document.getElementById("produk").value;
  let modal = parseInt(document.getElementById("modal").value);
  let jual = parseInt(document.getElementById("jual").value);
  let tanggal = document.getElementById("tanggal").value;
  let penjual = document.getElementById("penjual").value;

  if (!produk || !modal || !jual || !tanggal) {
    alert("Isi semua data!");
    return;
  }

  let untung = jual - modal;

  let item = { produk, modal, jual, tanggal, penjual, untung };

  data.push(item);
  localStorage.setItem("dataBisnis", JSON.stringify(data));

  tampilkanData();
}

// hapus data
function hapusData(index) {
  data.splice(index, 1);
  localStorage.setItem("dataBisnis", JSON.stringify(data));
  tampilkanData();
}

// tampilkan data
function tampilkanData(filterTanggal = "") {
  let tabel = document.getElementById("tabelData");
  tabel.innerHTML = "";

  let totalModal = 0;
  let totalOmzet = 0;
  let totalUntung = 0;

  let labels = [];
  let profitData = [];

  data.forEach((item, index) => {
    if (filterTanggal && item.tanggal !== filterTanggal) return;

    totalModal += item.modal;
    totalOmzet += item.jual;
    totalUntung += item.untung;

    tabel.innerHTML += `
      <tr>
        <td>${item.produk}</td>
        <td>${item.tanggal}</td>
        <td>${item.penjual}</td>
        <td>${formatRupiah(item.untung)}</td>
        <td><button class="delete" onclick="hapusData(${index})">Hapus</button></td>
      </tr>
    `;

    labels.push(item.tanggal);
    profitData.push(item.untung);
  });

  document.getElementById("totalBox").innerHTML = `
    Total Modal: ${formatRupiah(totalModal)} <br>
    Total Omzet: ${formatRupiah(totalOmzet)} <br>
    Total Untung: ${formatRupiah(totalUntung)}
  `;

  tampilkanChart(labels, profitData);
}

// filter
function filterData() {
  let tgl = document.getElementById("filterTanggal").value;
  tampilkanData(tgl);
}

// chart
function tampilkanChart(labels, dataProfit) {
  let ctx = document.getElementById("chartProfit");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Profit',
        data: dataProfit
      }]
    }
  });
}

// load awal
tampilkanData();