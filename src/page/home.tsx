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
    if (!selectedHabitat || !selectedCiriTubuh || !selectedJenisMakanan || !selectedTingkahLaku || !selectedWarnaTubuh || !selectedTempatTinggal) {
      alert("Harap isi semua dropdown sebelum mencari mamalia.");
      return;
    }
  
// Update the inputFacts type to be more specific
const inputFacts: { [key in keyof typeof dataMamalia[0]]: string } = {
  Habitat: selectedHabitat,
  Jenis_Makanan: selectedJenisMakanan,
  Ciri_Bentuk_Tubuh: selectedCiriTubuh,
  Tingkah_Laku: selectedTingkahLaku,
  Warna_Tubuh: selectedWarnaTubuh,
  Tempat_Tinggal: selectedTempatTinggal
};

  
    const matches = dataMamalia.map((mamalia: Mamalia) => {
      let matchCount = 0;
      let matchedAttributes: string[] = [];
      let matchDetails: string[] = [];  // Array to store detailed matches
  
      // Compare each attribute
// Update the forEach loop to use keyof
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
  

  const [transparencyLogs, setTransparencyLogs] = useState<string[]>([]); // To store logs for transparency

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
              <MenuItem value="Frugivora">Frugivora</MenuItem>
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
              <MenuItem value="Orange dengan Rambut Panjang">Orange dengan Rambut Panjang</MenuItem>
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

        {/* Button container */}
        <Grid item xs={12} className="d-flex justify-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!isFormValid}
            className="search-button"
          >
            Cari Mamalia
          </Button>
        </Grid>

        {/* Modal untuk menampilkan hasil pencarian */}
        <Modal
  open={openModal}
  onClose={() => setOpenModal(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '1000px',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
      maxHeight: '80vh', // Max height for the modal
      overflowY: 'auto', // Allows scrolling if the content overflows
    }}
  >
    <Typography
      variant="h6"
      id="modal-title"
      gutterBottom
      sx={{ fontWeight: 'bold', borderBottom: '2px solid #ccc', paddingBottom: 2 }}
    >
      Hasil Pencarian Mamalia
    </Typography>

    {/* Table container with scroll */}
    <TableContainer
      component={Paper}
      className="table-container"
      sx={{ maxHeight: 400, overflowY: 'auto' }} // Added maxHeight and scroll for the table
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nama Mamalia</b></TableCell>
            <TableCell><b>Klasifikasi</b></TableCell>
            <TableCell><b>Habitat</b></TableCell>
            <TableCell><b>Jenis Makanan</b></TableCell>
            <TableCell><b>Ciri Bentuk Tubuh</b></TableCell>
            <TableCell><b>Tingkah Laku</b></TableCell>
            <TableCell><b>Warna Tubuh</b></TableCell>
            <TableCell><b>Tempat Tinggal</b></TableCell>
            <TableCell><b>Akurasi (%)</b></TableCell>
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

    {/* Display transparency logs with scroll */}
    <Typography variant="h6" sx={{ marginTop: 3 }}>
      Transparansi Aturan yang Digunakan:
    </Typography>
    <Box
      sx={{
        marginTop: 1,
        padding: 2,
        backgroundColor: '#f7f7f7',
        maxHeight: '300px', // Set a fixed height for the log area
        overflowY: 'auto', // Add scroll if content exceeds the height
      }}
    >
      {transparencyLogs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <Button onClick={() => setOpenModal(false)} color="primary" variant="outlined">
        Tutup
      </Button>
    </Box>
  </Box>
</Modal>

      </Grid>
    </div>
  );
};

export default Home;
