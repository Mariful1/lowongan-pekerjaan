const jobList = document.getElementById('jobList');
const reviewsContainer = document.getElementById('reviews');

// Fetch jobs from the server
async function fetchJobs() {
    const response = await fetch('/jobs');
    const jobs = await response.json();
    displayJobs(jobs);
}

// Display jobs on the page
function displayJobs(jobs) {
    jobList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h5>${job.title}</h5>
            <p>${job.company} - ${job.location}</p>
            <p>${job.description}</p>
        </div>
    `).join('');
}

// Fetch reviews from the server
async function fetchReviews() {
    const response = await fetch('/reviews');
    const reviews = await response.json();
    displayReviews(reviews);
}

// Display reviews on the page
function displayReviews(reviews) {
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-card">
            <h5>${review.name} di ${review.company}</h5>
            <p>${review.review}</p>
        </div>
    `).join('');
}

// Submit review
document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = this[0].value;
    const company = this[1].value;
    const reviewText = this[2].value;

    await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, review: reviewText })
    });
    
    this.reset();
    fetchReviews(); // Refresh reviews
});

// Initial fetch of jobs and reviews
fetchJobs();
fetchReviews();
