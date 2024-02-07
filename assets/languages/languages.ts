import fr_FR from './fr_FR.json';

export type LangObject = {
  common: {
    next: string;
    back: string;
    cancel: string;
  };
  label: {
    email: string;
    password: string;
  };
  placeholder: {
    email: string;
    password: string;
  };
  auth: {
    login: string;
    logout: string;
    connect: string;
    register: string;
    register_link: string;
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