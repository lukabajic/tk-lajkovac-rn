export const signInForm = {
  anyTouched: false,
  values: {
    email: "",
    password: "",
  },
  fields: {
    email: {
      type: "emailAddress",
      label: "Email",
      placeholder: "primer@gmail.com",
      autoFocus: true,
      keyboardType: "email-address",
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    password: {
      type: "password",
      label: "Lozinka",
      placeholder: "********",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
};

export const signUpForm = {
  anyTouched: false,
  values: {
    email: "",
    password: "",
    confPassword: "",
  },
  fields: {
    email: {
      type: "emailAddress",
      label: "Email",
      placeholder: "primer@gmail.com",
      keyboardType: "email-address",
      autoFocus: true,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    password: {
      type: "newPassword",
      label: "Lozinka",
      placeholder: "********",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    confPassword: {
      type: "password",
      label: "Ponovite lozinku",
      placeholder: "********",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
};

export const userDataForm = (user) => ({
  anyTouched: false,
  values: {
    displayName: user?.displayName || "",
    phone: user?.phone || "",
  },
  fields: {
    displayName: {
      type: "name",
      label: "Ime i prezime",
      placeholder: "Novak Đoković",
      autoFocus: true,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    phone: {
      type: "telephoneNumber",
      label: "Broj telefona",
      placeholder: "063 982 0611",
      keyboardType: "numeric",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
});
