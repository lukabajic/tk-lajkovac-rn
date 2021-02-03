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
