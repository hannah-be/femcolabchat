# femcolabchat

## Create an action in the Actions on Google Console

<https://console.actions.google.com/u/0/>

Create a new project. Select conversational as category.

Select invocation phrase and voice. Save.

Add an action. Select ```build custom intent```.

## Create an agent

Within Dialogflow, create an agent and make sure it links to the actions project just created.

Go to Intents > Default Welcome Intent. Delete default responses and enable webhook fulfillment.

Add two more intents: 
1. getContent - add training phrases (e.g. "get me some content", "give me some words") and enable fulfillment

2. actions_intent_PERMISSION - event will be GoogleAssistantPermission, and enable fulfillment.

## Build fulfilment

Install the firebase CLI via npm: ```npm install -g firebase-tools```
This installs the globally available firebase command.

Install the firebase functions sdk: ```npm install firebase-functions```

Run ```firebase login``` to log in via the browser and authenticate the firebase tool.

Clone repository and initialise firebase project: ```firebase init```. Select defaults and functions.

Within the functions folder, run ```npm install```.

Make any changes to the intent fulfillment you want within index.js.

## Deployment

Retrieve the project name from the actions console.

Run ```firebase deploy --project [project name]```.

Navigate to the firebase console using the address this returns. Retrive the URL from the functions dashboard under the ```trigger``` column.

If you're going to call an external API, you need to upgrade your firebase plan to Blaze.

Return to the dialogflow console and under the fulfillment tab, enable webook calling and add the firebase function URL.

Under the integrations tab, click Integration Settings. Add getContent as an implicit invocation. Enable ```auto-preview changes``` and select TEST to try out your app in the actions console simulator.