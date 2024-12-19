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
  Select,
  Grid,
  Modal,
  Box,
} from '@mui/material';

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

const Home = () => {
  const [selectedHabitat, setSelectedHabitat] = useState<string>('');
  const [selectedCiriTubuh, setSelectedCiriTubuh] = useState<string>('');
  const [selectedJenisMakanan, setSelectedJenisMakanan] = useState<string>('');
  const [selectedTingkahLaku, setSelectedTingkahLaku] = useState<string>('');
  const [selectedWarnaTubuh, setSelectedWarnaTubuh] = useState<string>('');
  const [selectedTempatTinggal, setSelectedTempatTinggal] = useState<string>('');
  const [results, setResults] = useState<MamaliaWithAccuracy[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false); // State untuk kontrol modal
  const [transparencyLogs, setTransparencyLogs] = useState<string[]>([]); // To store logs for transparency

  const dataMamalia: Mamalia[] = [
    // Data mamalia contoh
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
    // ... (other mamalia data here)
  ];

  const handleSearch = (): void => {
    if (!selectedHabitat || !selectedCiriTubuh || !selectedJenisMakanan || !selectedTingkahLaku || !selectedWarnaTubuh || !selectedTempatTinggal) {
      alert("Harap isi semua dropdown sebelum mencari mamalia.");
      return;
    }

    // Create inputFacts for matching
    const inputFacts: { [key in keyof typeof dataMamalia[0]]: string } = {
      Habitat: selectedHabitat,
      Jenis_Makanan: selectedJenisMakanan,
      Ciri_Bentuk_Tubuh: selectedCiriTubuh,
      Tingkah_Laku: selectedTingkahLaku,
      Warna_Tubuh: selectedWarnaTubuh,
      Tempat_Tinggal: selectedTempatTinggal,
    };

    // Find matches
    const matches = dataMamalia.map((mamalia: Mamalia) => {
      let matchCount = 0;
      let matchedAttributes: string[] = [];
      let matchDetails: string[] = [];

      // Compare each attribute
      Object.keys(inputFacts).forEach((key: string) => {
        const typedKey = key as keyof typeof inputFacts; // Assert key type
        if (mamalia[typedKey] === inputFacts[typedKey]) {
          matchCount++;
          matchedAttributes.push(key);
          matchDetails.push(`${key}: ${mamalia[typedKey]} (User Input: ${inputFacts[typedKey]})`);
        }
      });

      const accuracy = (matchCount / 6) * 100; // Calculate accuracy based on 6 factors

      return { ...mamalia, Accuracy: accuracy, matchedAttributes, matchDetails };
    }).filter((item) => item.Accuracy >= 50); // Filter matches with accuracy >= 50%

    // Sort the results by accuracy
    matches.sort((a, b) => b.Accuracy - a.Accuracy);

    // If no matches are found
    if (matches.length === 0) {
      alert('Tidak ada mamalia yang sesuai dengan kriteria yang diberikan.');
    }

    // Set results
    setResults(matches);

    // Set transparency logs for each selected attribute
    const logs: string[] = [];
    Object.keys(inputFacts).forEach((key) => {
      const filteredResults = matches.filter((m) => m[key as keyof Mamalia] === inputFacts[key as keyof typeof inputFacts]);
      if (filteredResults.length > 0) {
        logs.push(`\nMatches for ${key}: ${inputFacts[key]}`);
        filteredResults.forEach((mamalia) => {
          logs.push(`  - ${mamalia.Nama_Mamalia}: ${mamalia[key as keyof Mamalia]}`);
        });
      }
    });

    setTransparencyLogs(logs); // Set the logs for transparency
    setOpenModal(true); // Open the modal to show the results
  };

  const isFormValid = selectedHabitat && selectedCiriTubuh && selectedJenisMakanan && selectedTingkahLaku && selectedWarnaTubuh && selectedTempatTinggal;

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom className="title">
        Sistem Pakar Mamalia Berdasarkan Ciri-Ciri
      </Typography>
      <Grid container spacing={2} className="filter-section">
        {/* Habitat Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Habitat</p>
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

        {/* Ciri Bentuk Tubuh Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Ciri Bentuk Tubuh</p>
            <Select value={selectedCiriTubuh} onChange={(e) => setSelectedCiriTubuh(e.target.value)}>
              <MenuItem value="Lonjong">Lonjong</MenuItem>
              <MenuItem value="Berat dengan Cakar Besar">Berat dengan Cakar Besar</MenuItem>
              <MenuItem value="Besar dengan Belalai">Besar dengan Belalai</MenuItem>
              <MenuItem value="Kekar dengan Tangan Panjang">Kekar dengan Tangan Panjang</MenuItem>
              <MenuItem value="Berbulu">Berbulu</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Jenis Makanan Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Jenis Makanan</p>
            <Select value={selectedJenisMakanan} onChange={(e) => setSelectedJenisMakanan(e.target.value)}>
              <MenuItem value="Plankton dan Ikan">Plankton dan Ikan</MenuItem>
              <MenuItem value="Karnivora">Karnivora</MenuItem>
              <MenuItem value="Herbivora">Herbivora</MenuItem>
              <MenuItem value="Omnivora">Omnivora</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tingkah Laku Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Tingkah Laku</p>
            <Select value={selectedTingkahLaku} onChange={(e) => setSelectedTingkahLaku(e.target.value)}>
              <MenuItem value="Nocturnal">Nocturnal</MenuItem>
              <MenuItem value="Soliter">Soliter</MenuItem>
              <MenuItem value="Kepekaan Gerakan Tinggi">Kepekaan Gerakan Tinggi</MenuItem>
              <MenuItem value="Sosial">Sosial</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Warna Tubuh Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Warna Tubuh</p>
            <Select value={selectedWarnaTubuh} onChange={(e) => setSelectedWarnaTubuh(e.target.value)}>
              <MenuItem value="Abu-abu keputihan">Abu-abu keputihan</MenuItem>
              <MenuItem value="Orange dengan Garis Tiger">Orange dengan Garis Tiger</MenuItem>
              <MenuItem value="Abu-abu">Abu-abu</MenuItem>
              <MenuItem value="Putih">Putih</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tempat Tinggal Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <p>Tempat Tinggal</p>
            <Select value={selectedTempatTinggal} onChange={(e) => setSelectedTempatTinggal(e.target.value)}>
              <MenuItem value="Air">Air</MenuItem>
              <MenuItem value="Darat">Darat</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSearch} disabled={!isFormValid}>
        Cari Mamalia
      </Button>

      {/* Modal untuk menampilkan hasil */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 3, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80%', overflowY: 'auto' }}>
          <Typography variant="h6">Hasil Pencarian Mamalia</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="mamalia-table">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Mamalia</TableCell>
                  <TableCell align="center">Akurasi (%)</TableCell>
                  <TableCell align="center">Cocok</TableCell>
                  <TableCell align="center">Detil Pencocokan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((mamalia) => (
                  <TableRow key={mamalia.Nama_Mamalia}>
                    <TableCell>{mamalia.Nama_Mamalia}</TableCell>
                    <TableCell align="center">{mamalia.Accuracy.toFixed(2)}%</TableCell>
                    <TableCell align="center">{mamalia.matchedAttributes.join(', ')}</TableCell>
                    <TableCell align="center">
                      <pre>{mamalia.matchDetails.join('\n')}</pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" mt={2}>Logs Transparansi:</Typography>
          <pre>{transparencyLogs.join('\n')}</pre>
          <Button onClick={() => setOpenModal(false)} color="primary" variant="contained" sx={{ marginTop: 2 }}>
            Tutup
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
