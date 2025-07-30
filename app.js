const express = require('express');

const scenarios = [
  {
    challenge: 'ensuring that systems stays reliable',
    incident:
      'many users reported being unable to access critical parts of the service',
    troubleshooting:
      'you check if any recent updates might be the problem, and discover a fault was added and report it to the relevant person',
  },
  {
    challenge: 'ensuring that a system is secure',
    incident: 'you get a report that a system is acting strange',
    troubleshooting:
      'you physically inspect the system to check for any signs of tampering or physical attacks and discover that the user plugged in a non secured USB stick, you proceed to run a training session on data security',
  },
  {
    challenge: 'ensuring that a system stays performant',
    incident:
      'a colleague enquires for you help as they cannot develop a system while keeping it as performant as needed by company guidelines',
    troubleshooting:
      'you take a different approach than your colleague and manage to keep the system within company guidelines',
  },
];

const sentenceStructures = [
  'You work as a *role* in *technology*, and you face many challenges such as *challenge*. \nOne day *incident*, which often happens while working for *environment* companies. \nTo solve this issue *troubleshooting*.',
  'Randomly *incident*, which happens when *challenge* while working as a *role* for *environment* companies. \nWhen trying to resolve this incident *troubleshooting*, and this is another day while working in *technology*.',
];

function createScenario(technology, role, environment) {
  const { challenge, incident, troubleshooting } =
    scenarios[getRandomInt(scenarios.length)];

  const sentenceStructure =
    sentenceStructures[getRandomInt(sentenceStructures.length)];

  const finalString = sentenceStructure
    .replace('*technology*', technology)
    .replace('*role*', role)
    .replace('*environment*', environment)
    .replace('*challenge*', challenge)
    .replace('*incident*', incident)
    .replace('*troubleshooting*', troubleshooting);

  return finalString;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/', (req, res) => {
  try {
    const { environment, role, technology } = req.body;

    if (!(environment && role && technology)) {
      throw new Error('Ensure all fields have been filled');
    }

    const returnString = createScenario(technology, role, environment);

    res.status(200).json({
      status: 'success',
      data: {
        originalInputs: req.body,
        scenario: returnString,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

app.get('/{*any}', (req, res) => {
  res.redirect('/');
});

module.exports = { app, createScenario };
