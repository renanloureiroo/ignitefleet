const LICENSE_PLATE_REGEX = "[A-Z]{3}[0-9][A-Z0-9][0-9]{2}";

export const licensePlateValidate = (value: string) => {
  return value.replaceAll(" ", "").toUpperCase().match(LICENSE_PLATE_REGEX)
    ? true
    : false;
};
