// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const { dialogflow, Permission, Suggestions } = require("actions-on-google");
const axios = require("axios");
// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");
// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

app.intent("Default Welcome Intent", (conv) => {
  const name = conv.user.storage.userName;
  if (!name) {
    conv.ask(new Permission({
      context: "Hi there, to get to know you better",
      permissions: "NAME"
    }))
  }
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent("actions_intent_PERMISSION", (conv, params, permissionGranted) => {
  // If the user denied our request, go ahead with the conversation.
  let intro = `OK, no worries. How can I help you?`;
  if (permissionGranted) {
    // If the user accepted our request, store their name in
    // the 'conv.data' object for the duration of the conversation.
    conv.data.userName = conv.user.name.display;
    const name = conv.data.userName.split(" ").slice(0, 1);
    intro = `Thanks, ${name}. How can I help you?`;
  }
  conv.ask(intro);
  conv.ask(new Suggestions("Give me ten words"));
  conv.ask(new Suggestions("Give me twenty words"));
  conv.ask(new Suggestions("Give me thirty words"));
});

app.intent("getContent", async (conv, { number }) => {
  const newNumber = number || 10;
  const words = await getWords(newNumber);
  conv.close(`<speak>Sure, here are some words: ${words}</speak>`);
})

async function getWords(number) {
  const baseUrl = "http://hipsterjesus.com/api/";
  const response = await axios.get(baseUrl);
  const text = response.data.text;
  const words = text.split(" ").slice(0, number).join(", "); 
  return words;
}

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);