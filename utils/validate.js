export const validate = (field, value) => {
  let error = null;
  let valid = true;
  switch (field) {
    case "email":
      if (!value) {
        error = "Obavezno polje";
        valid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Nepravilna email adresa";
        valid = false;
      }
      return { error, valid };
    case "password":
      if (!value) {
        error = "Obavezno polje";
        valid = false;
      } else if (value.length < 8) {
        error = "Sifra treba da ima barem 8 karaktera";
        valid = false;
      }
      return { error, valid };
    case "confPassword":
      if (!value) {
        error = "Obavezno polje";
        valid = false;
      } else if (value !== form.values.password) {
        error = "Sifra bi trebalo da se poklapaju.";
        valid = false;
      }
      return { error, valid };
    default:
      return { error, valid };
  }
};
