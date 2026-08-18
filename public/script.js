const form = document.getElementById('contactForm');
const messageEl = document.getElementById('message');
const entriesList = document.getElementById('entriesList');
const submitBtn = form.querySelector('button[type="submit"]');

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

async function loadEntries() {
  try {
    const res = await fetch('/api/contacts');
    const data = await res.json();

    entriesList.innerHTML = '';
    data.slice(0, 10).forEach((entry) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${entry.name}</strong> — ${entry.email} — ${entry.phone}`;
      entriesList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load entries', err);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  showMessage('', '');

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
  };

  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    showMessage('Saved successfully!', 'success');
    form.reset();
    loadEntries();
  } catch (err) {
    showMessage(err.message, 'error');
  } finally {
    submitBtn.disabled = false;
  }
});

// Load existing entries on page load
loadEntries();
