export const signInForm = {
  anyTouched: false,
  values: {
    email: "",
    password: "",
  },
  fields: {
    email: {
      order: 0,
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
      order: 1,
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
    order: 0,
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
      order: 1,
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
      order: 2,
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

export const userDataForm = {
  anyTouched: false,
  values: {
    displayName: "",
    phone: "",
  },
  fields: {
    displayName: {
      order: 0,
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
      order: 1,
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
};

export const userNameForm = (user) => ({
  anyTouched: false,
  values: {
    firstName: user?.data.displayName.split(" ")[0] || "",
    lastName: user?.data.displayName.split(" ")[1] || "",
  },
  fields: {
    firstName: {
      order: 0,
      type: "name",
      label: "Ime",
      placeholder: "Novak",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    lastName: {
      order: 1,
      type: "name",
      label: "Prezime",
      placeholder: "Đoković",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
});

export const userPhoneForm = (user) => ({
  anyTouched: false,
  values: {
    phone: user?.data.phone || "",
  },
  fields: {
    phone: {
      order: 0,
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

export const userEmailForm = (user) => ({
  anyTouched: false,
  values: {
    email: user?.email || "",
  },
  fields: {
    email: {
      order: 0,
      type: "emailAddress",
      label: "Email",
      placeholder: "primer@gmail.com",
      keyboardType: "email-address",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
});

export const userPasswordForm = {
  anyTouched: false,
  values: {
    oldPassword: "",
    password: "",
    confPassword: "",
  },
  fields: {
    oldPassword: {
      order: 0,
      type: "password",
      label: "Stara lozinka",
      placeholder: "********",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    password: {
      order: 1,
      type: "newPassword",
      label: "Nova lozinka",
      placeholder: "********",
      autoFocus: false,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
    confPassword: {
      order: 2,
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
