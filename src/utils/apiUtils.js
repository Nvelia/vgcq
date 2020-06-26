export const parseApiErrors = (error) => {
  if (!error.response) {
    return { erreur: "Erreur" };
  }

  return error.response.body.violations.reduce((parsedErrors, violation) => {
    parsedErrors[violation["propertyPath"]] = violation["message"];
    return parsedErrors;
  }, {});
};

export const hydraPageCount = (collection) => {
  if (!collection["hydra:view"] || !collection["hydra:view"]["hydra:next"]) {
    return 1;
  }

  return Number(collection["hydra:view"]["hydra:last"].match(/page=(\d+)/)[1]);
};
