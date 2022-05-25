

/* ----- Form validate response ----- */
//export const MAIL_ACCEPT_VALUE = /^[\w-\._\+%]+@(live|hotmail|gmail|icloud|yandex)\./;

export const MAIL_ACCEPT_VALUE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const IP_ACCEPT_VALUE = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
export const PORT_ACCEPT_VALUE = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;

export const REQUIRED_MESSAGE = 'This field is required.';
export const PASSWORD_MIN_MESSAGE = 'Password more than 5 characters.';
export const MAIL_ACCEPT_MESSAGE = "Invalid email address.";
export const MIN_LENGTH_REGISTER_NAME_MESSAGE = "User name must be at least 3 characters long.";
export const PASSWORD_CONFIRM_MESSAGE = "Confirmed password does not match.";
export const MIN_LENGTH_VERIFY_MESSAGE = "Invalid code.";
export const IS_NUMBER_MESSAGE = "Input must be numeric.";
export const INVALID_MESSAGE = 'This field is invalid.';
export const IP_ACCEPT_MESSAGE = "Invalid IP address.";
export const PORT_ACCEPT_MESSAGE = "Invalid port address.";
export const MAXLENGTH_MESSAGE = "This field is too long.";