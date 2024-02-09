import fr_FR from './fr_FR.json';

export type LangObject = {
  common: {
    next: string;
    back: string;
    cancel: string;
  };
  label: {
    log: string;
    username: string;
    email: string;
    password: string;
    password_confirm: string;
  };
  placeholder: {
    log: string;
    username: string;
    email: string;
    password: string;
    password_confirm: string;
  };
  auth: {
    register: string;
    login: string;
    logout: string;
    connect: string;
    no_account: string;
    no_account_link: string;
    forgot_password: string;
    policies: string;
  };
  format: {
    required: string;
    invalid: string;
  };
  policy: {
    usage: string;
    privacy: string;
  };
};

export type Lang = 'fr_FR';

type Langs = {
  fr_FR: LangObject;
};

const langs: Langs = { fr_FR };

export default langs;
