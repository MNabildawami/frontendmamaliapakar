import React, { useState } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import './App.css';

// Definisikan tipe data untuk mamalia
interface Mamalia {
  Nama_Mamalia: string;
  Klasifikasi: string;
  Habitat: string;
  Jenis_Makanan: string;
  Ciri_Bentuk_Tubuh: string;
  Tingkah_Laku: string;
  Warna_Tubuh: string;
  Tempat_Tinggal: string;
}

// Tambahkan tipe data untuk hasil dengan akurasi
interface MamaliaWithAccuracy extends Mamalia {
  Accuracy: number;
}

const App = () => {
  const [selectedHabitat, setSelectedHabitat] = useState<string>('');
  const [selectedCiriTubuh, setSelectedCiriTubuh] = useState<string>('');
  const [selectedJenisMakanan, setSelectedJenisMakanan] = useState<string>('');
  const [selectedTingkahLaku, setSelectedTingkahLaku] = useState<string>('');
  const [selectedWarnaTubuh, setSelectedWarnaTubuh] = useState<string>('');
  const [selectedTempatTinggal, setSelectedTempatTinggal] = useState<string>('');
  const [results, setResults] = useState<MamaliaWithAccuracy[]>([]);

  const dataMamalia: Mamalia[] = [
    {
      Nama_Mamalia: 'Lumba-lumba Hidung Botol',
      Klasifikasi: 'Mamalia',
      Habitat: 'Pantai dan Lautan',
      Jenis_Makanan: 'Plankton dan Ikan',
      Ciri_Bentuk_Tubuh: 'Lonjong',
      Tingkah_Laku: 'Nocturnal',
      Warna_Tubuh: 'Abu-abu keputihan',
      Tempat_Tinggal: 'Air',
    },
    {
      Nama_Mamalia: 'Harimau Sumatera',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan Hujan Besar',
      Jenis_Makanan: 'Karnivora',
      Ciri_Bentuk_Tubuh: 'Berat dengan Cakar Besar',
      Tingkah_Laku: 'Soliter',
      Warna_Tubuh: 'Orange dengan Garis Tiger',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Gajah Asia',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan dan Padang Savana',
      Jenis_Makanan: 'Herbivora',
      Ciri_Bentuk_Tubuh: 'Besar dengan Belalai',
      Tingkah_Laku: 'Kepekaan Gerakan Tinggi',
      Warna_Tubuh: 'Abu-abu',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Orangutan',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan Hujan',
      Jenis_Makanan: 'Omnivora',
      Ciri_Bentuk_Tubuh: 'Kekar dengan Tangan Panjang',
      Tingkah_Laku: 'Soliter',
      Warna_Tubuh: 'Orange dengan Rambut Panjang',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Kelelawar Buah',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan dan Area Terbuka',
      Jenis_Makanan: 'Frugivora',
      Ciri_Bentuk_Tubuh: 'Berbulu',
      Tingkah_Laku: 'Nocturnal',
      Warna_Tubuh: 'Hitam dengan Bercak Kuning',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Badak Jawa',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan Bakau dan Hutan',
      Jenis_Makanan: 'Herbivora',
      Ciri_Bentuk_Tubuh: 'Besar dengan Kulit Kasar',
      Tingkah_Laku: 'Soliter',
      Warna_Tubuh: 'Abu-abu Kelabu',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Beruang Madu',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan Hujan',
      Jenis_Makanan: 'Omnivora',
      Ciri_Bentuk_Tubuh: 'Tegap dengan Cakar Panjang',
      Tingkah_Laku: 'Soliter',
      Warna_Tubuh: 'Hitam dengan Cincin Kuning',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Rusa Timor',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan dan Padang Rumput',
      Jenis_Makanan: 'Herbivora',
      Ciri_Bentuk_Tubuh: 'Cepat dengan Tanduk',
      Tingkah_Laku: 'Nocturnal',
      Warna_Tubuh: 'Coklat Pudar dengan Putih di Perut',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Trenggiling Jawa',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan dan Area Terbuka',
      Jenis_Makanan: 'Insektofag',
      Ciri_Bentuk_Tubuh: 'Kecil dengan Bulu Perisai',
      Tingkah_Laku: 'Nocturnal',
      Warna_Tubuh: 'Berlian Coklat',
      Tempat_Tinggal: 'Darat',
    },
    {
      Nama_Mamalia: 'Kuskus',
      Klasifikasi: 'Mamalia',
      Habitat: 'Hutan dan Area Bervegetasi',
      Jenis_Makanan: 'Herbivora',
      Ciri_Bentuk_Tubuh: 'Kecil dengan Ekor Panjang',
      Tingkah_Laku: 'Soliter',
      Warna_Tubuh: 'Abu-abu Coklat',
      Tempat_Tinggal: 'Darat',
    },
  ];

const handleSearch = (): void => {
  const filteredResults = dataMamalia
    .map((item: Mamalia) => {
      let matchCount = 0;
      const totalCriteria = 6;

      if (selectedHabitat && item.Habitat === selectedHabitat) matchCount++;
      if (selectedCiriTubuh && item.Ciri_Bentuk_Tubuh === selectedCiriTubuh) matchCount++;
      if (selectedJenisMakanan && item.Jenis_Makanan === selectedJenisMakanan) matchCount++;
      if (selectedTingkahLaku && item.Tingkah_Laku === selectedTingkahLaku) matchCount++;
      if (selectedWarnaTubuh && item.Warna_Tubuh === selectedWarnaTubuh) matchCount++;
      if (selectedTempatTinggal && item.Tempat_Tinggal === selectedTempatTinggal) matchCount++;

      const accuracy = (matchCount / totalCriteria) * 100;

      return { ...item, Accuracy: accuracy };
    })
    .filter((item) => item.Accuracy >= 50) // Filter accuracy >= 50%
    .sort((a, b) => b.Accuracy - a.Accuracy); // Sort by accuracy in descending order

  if (filteredResults.length === 0) {
    alert('Tidak ada mamalia yang sesuai dengan kriteria yang diberikan.');
  }

  setResults(filteredResults);
};


  const isFormValid = selectedHabitat && selectedCiriTubuh && selectedJenisMakanan && selectedTingkahLaku && selectedWarnaTubuh && selectedTempatTinggal;

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom className="title">
        Sistem Pakar Mamalia Berdasarkan Ciri-Ciri
      </Typography>
      <Grid container spacing={2} className="filter-section">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Habitat</InputLabel>
            <Select value={selectedHabitat} onChange={(e) => setSelectedHabitat(e.target.value)}>
              <MenuItem value="Pantai dan Lautan">Pantai dan Lautan</MenuItem>
              <MenuItem value="Hutan Hujan Besar">Hutan Hujan Besar</MenuItem>
              <MenuItem value="Hutan dan Padang Savana">Hutan dan Padang Savana</MenuItem>
              <MenuItem value="Hutan Hujan">Hutan Hujan</MenuItem>
              <MenuItem value="Hutan Bakau dan Hutan">Hutan Bakau dan Hutan</MenuItem>
              <MenuItem value="Hutan dan Area Terbuka">Hutan dan Area Terbuka</MenuItem>
              <MenuItem value="Hutan dan Padang Rumput">Hutan dan Padang Rumput</MenuItem>
              <MenuItem value="Hutan dan Area Bervegetasi">Hutan dan Area Bervegetasi</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Ciri Bentuk Tubuh</InputLabel>
            <Select value={selectedCiriTubuh} onChange={(e) => setSelectedCiriTubuh(e.target.value)}>
              <MenuItem value="Lonjong">Lonjong</MenuItem>
              <MenuItem value="Berat dengan Cakar Besar">Berat dengan Cakar Besar</MenuItem>
              <MenuItem value="Besar dengan Belalai">Besar dengan Belalai</MenuItem>
              <MenuItem value="Kekar dengan Tangan Panjang">Kekar dengan Tangan Panjang</MenuItem>
              <MenuItem value="Berbulu">Berbulu</MenuItem>
              <MenuItem value="Besar dengan Kulit Kasar">Besar dengan Kulit Kasar</MenuItem>
              <MenuItem value="Tegap dengan Cakar Panjang">Tegap dengan Cakar Panjang</MenuItem>
              <MenuItem value="Cepat dengan Tanduk">Cepat dengan Tanduk</MenuItem>
              <MenuItem value="Kecil dengan Bulu Perisai">Kecil dengan Bulu Perisai</MenuItem>
              <MenuItem value="Kecil dengan Ekor Panjang">Kecil dengan Ekor Panjang</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Jenis Makanan</InputLabel>
            <Select value={selectedJenisMakanan} onChange={(e) => setSelectedJenisMakanan(e.target.value)}>
              <MenuItem value="Plankton dan Ikan">Plankton dan Ikan</MenuItem>
              <MenuItem value="Karnivora">Karnivora</MenuItem>
              <MenuItem value="Herbivora">Herbivora</MenuItem>
              <MenuItem value="Omnivora">Omnivora</MenuItem>
              <MenuItem value="Frugivora">Frugivora</MenuItem>
              <MenuItem value="Insektofag">Insektofag</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Tingkah Laku</InputLabel>
            <Select value={selectedTingkahLaku} onChange={(e) => setSelectedTingkahLaku(e.target.value)}>
              <MenuItem value="Nocturnal">Nocturnal</MenuItem>
              <MenuItem value="Soliter">Soliter</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Warna Tubuh</InputLabel>
            <Select value={selectedWarnaTubuh} onChange={(e) => setSelectedWarnaTubuh(e.target.value)}>
              <MenuItem value="Abu-abu keputihan">Abu-abu keputihan</MenuItem>
              <MenuItem value="Orange dengan Garis Tiger">Orange dengan Garis Tiger</MenuItem>
              <MenuItem value="Orange dengan Rambut Panjang">Orange dengan Rambut Panjang</MenuItem>
              <MenuItem value="Hitam dengan Bercak Kuning">Hitam dengan Bercak Kuning</MenuItem>
              <MenuItem value="Abu-abu Kelabu">Abu-abu Kelabu</MenuItem>
              <MenuItem value="Hitam dengan Cincin Kuning">Hitam dengan Cincin Kuning</MenuItem>
              <MenuItem value="Coklat Pudar dengan Putih di Perut">Coklat Pudar dengan Putih di Perut</MenuItem>
              <MenuItem value="Berlian Coklat">Berlian Coklat</MenuItem>
              <MenuItem value="Abu-abu Coklat">Abu-abu Coklat</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Tempat Tinggal</InputLabel>
            <Select value={selectedTempatTinggal} onChange={(e) => setSelectedTempatTinggal(e.target.value)}>
              <MenuItem value="Air">Air</MenuItem>
              <MenuItem value="Darat">Darat</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!isFormValid}
        className="search-button"
      >
        Cari Mamalia
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Mamalia</TableCell>
              <TableCell>Klasifikasi</TableCell>
              <TableCell>Habitat</TableCell>
              <TableCell>Jenis Makanan</TableCell>
              <TableCell>Ciri Bentuk Tubuh</TableCell>
              <TableCell>Tingkah Laku</TableCell>
              <TableCell>Warna Tubuh</TableCell>
              <TableCell>Tempat Tinggal</TableCell>
              <TableCell>Akurasi (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row: MamaliaWithAccuracy, index) => (
              <TableRow key={index}>
                <TableCell>{row.Nama_Mamalia}</TableCell>
                <TableCell>{row.Klasifikasi}</TableCell>
                <TableCell>{row.Habitat}</TableCell>
                <TableCell>{row.Jenis_Makanan}</TableCell>
                <TableCell>{row.Ciri_Bentuk_Tubuh}</TableCell>
                <TableCell>{row.Tingkah_Laku}</TableCell>
                <TableCell>{row.Warna_Tubuh}</TableCell>
                <TableCell>{row.Tempat_Tinggal}</TableCell>
                <TableCell>{row.Accuracy.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;