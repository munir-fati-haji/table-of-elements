const elements = require("./elements.json");

module.exports = {
  data: {
    ...elements,
  },
  endpoints: {
    "/api/elements": "/elements",
    "/api/elements/:id": "/elements/:id",
  },
};
