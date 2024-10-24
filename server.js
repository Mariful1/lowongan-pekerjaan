const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema untuk Lowongan dan Ulasan
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
});

const reviewSchema = new mongoose.Schema({
    name: String,
    company: String,
    review: String,
});

const Job = mongoose.model('Job', jobSchema);
const Review = mongoose.model('Review', reviewSchema);

// Endpoint untuk mendapatkan lowongan
app.get('/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

// Endpoint untuk mendapatkan ulasan
app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

// Endpoint untuk menambahkan ulasan
app.post('/reviews', async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
});

// Tambahkan beberapa lowongan contoh (jalankan sekali)
async function addSampleJobs() {
    const jobs = [
        { title: 'Software Engineer', company: 'Perusahaan A', location: 'Jakarta', description: 'Bertanggung jawab untuk pengembangan software.' },
        { title: 'Marketing Executive', company: 'Perusahaan B', location: 'Bandung', description: 'Mengelola strategi pemasaran.' },
    ];
    await Job.insertMany(jobs);
}

// Uncomment untuk menambahkan lowongan contoh
// addSampleJobs();

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
