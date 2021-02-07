export const validate = (field, value, form = {}) => {
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
      } else if (value !== form?.values.password) {
        error = "Sifra bi trebalo da se poklapaju.";
        valid = false;
      }
      return { error, valid };
    case "displayName":
      if (!value) {
        error = "Obavezno polje";
        valid = false;
      } else if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm.test(value)) {
        error = "Unesite pravo ime i prezime";
        valid = false;
      }
      return { error, valid };
    case "phone":
      if (!value) {
        error = "Obavezno polje";
        valid = false;
      } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g) {
        error = "Unesite ispravan broj telefona";
        valid = false;
      }
      return { error, valid };
    default:
      return { error, valid };
  }
};
