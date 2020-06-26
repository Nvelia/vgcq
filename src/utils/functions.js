const stringSimilarity = require("string-similarity");

export function isAnswerCorrect(quiz, userAnswer) {
  let valid = false;
  userAnswer = userAnswer.toLowerCase().trim();

  for (let i = 0; i < quiz.acceptedAnswers.length; i++) {
    const lowerCaseAnswer = quiz.acceptedAnswers[i].toLowerCase().trim();

    var similarity = stringSimilarity.compareTwoStrings(
      userAnswer,
      lowerCaseAnswer
    );

    if (similarity >= 0.85) {
      valid = true;
    }
  }

  return valid;
}

export function submitGamesheet(
  gamesheet = null,
  values,
  image = null,
  gamesheetEdit,
  gamesheetAdd
) {
  if (gamesheet) {
    if (image && image.data) {
      values.image = `/api/images/${image.data.id}`;
    }
    values.published = true;

    return gamesheetEdit(gamesheet.slug, values);
  } else {
    return gamesheetAdd(values);
  }
}

export function submitCard(
  card = null,
  values,
  cardEdit,
  cardAdd,
  quizEdit,
  gamesheet
) {
  if (card) {
    if (!values.quiz) {
      let quiz = {
        published: true,
      };
      values.quiz = quiz;
    } else {
      values.quiz.published = true;
    }

    values.published = true;

    quizEdit(card.quiz.id, values.quiz);
    delete values.quiz;

    return cardEdit(card.id, values);
  }

  values.Gamesheet = gamesheet && gamesheet["@id"];
  return cardAdd(values);
}
