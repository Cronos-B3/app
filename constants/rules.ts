type RulesProps = {
  identifier: any;
  username: any;
  email: any;
  password: any;
};

const RULES = {
  identifier: {
    minLength: 3
  },
  username: {
    minLength: 3,
    pattern: /^[a-z0-9_]{3,}$/
  },
  email: {
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/i
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i
  }
} as RulesProps;

export default RULES;
