const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Cloud Function to save a score (called from the client)
exports.saveScore = functions.https.onCall(async (data, context) => {
  const score = data.score;
  if (typeof score !== "number" || score < 0 || score > 5) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Score must be a number between 0 and 5.",
    );
  }

  try {
    const scoresRef = admin.database().ref("scores");
    await scoresRef.push(score);
    return {message: "Score saved successfully!"};
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Unable to save score.");
  }
});

// Cloud Function to calculate the average score
exports.calculateAverage = functions.https.onRequest(async (req, res) => {
  try {
    const scoresRef = admin.database().ref("scores");
    const snapshot = await scoresRef.once("value");

    const scores = snapshot.val();
    if (!scores) {
      return res.status(200).send({average: 0});
    }

    const scoresArray = Object.values(scores);
    const sum = scoresArray.reduce((total, score) => total + score, 0);
    const average = sum / scoresArray.length;

    res.status(200).send({average: average.toFixed(2)});
  } catch (error) {
    console.error("Error calculating average:", error);
    res.status(500).send({error: "Internal Server Error"});
  }
});
