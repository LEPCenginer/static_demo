document.getElementById('cropForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        N: parseFloat(form.N.value),
        P: parseFloat(form.P.value),
        K: parseFloat(form.K.value),
        temperature: parseFloat(form.temperature.value),
        humidity: parseFloat(form.humidity.value),
        ph: parseFloat(form.ph.value),
        rainfall: parseFloat(form.rainfall.value)
    };
    const model = form.model.value;
    let endpoint = '/crop/predict_rf';
    if (model === 'svm') endpoint = '/crop/predict_svm';
    document.getElementById('result').textContent = 'Loading...';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error: ' + response.status);
        const result = await response.json();
        document.getElementById('result').textContent = 'Recommended crop: ' + result.recommendation;
    } catch (err) {
        document.getElementById('result').textContent = 'Error: ' + err.message;
    }
});
