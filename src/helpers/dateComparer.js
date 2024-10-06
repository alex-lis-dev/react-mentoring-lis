const dateComparer = (a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  export default dateComparer;