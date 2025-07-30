'use strict';

const mainForm = document.getElementById('mainForm');
const technologyInput = document.getElementById('technology');
const roleInput = document.getElementById('role');
const environmentInput = document.getElementById('environment');
const scenarioInput = document.getElementById('scenario');

mainForm.addEventListener('submit', async event => {
  event.preventDefault();

  try {
    const apiCall = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        technology: technologyInput.value,
        role: roleInput.value,
        environment: environment.value,
      }),
    });

    const response = await apiCall.json();

    if (!apiCall.ok) {
      throw new Error(response.message);
    }

    scenarioInput.value = response.data.scenario;
  } catch (err) {
    alert(err.message);
  }
});
