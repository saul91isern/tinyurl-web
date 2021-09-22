const linksLoading = (state = false, { type }) => {
  switch (type) {
    case "trigger":
      return true;
    case "fullfill":
      return false;
    default:
      return state;
  }
};

const links = (state = [], { type, payload }) => {
  switch (type) {
    case "trigger":
      return [];
    case "success":
      return payload.data;
    default:
      return state;
  }
};

export { links, linksLoading };
