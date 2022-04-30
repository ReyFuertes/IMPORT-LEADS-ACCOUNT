

export const checkGetType = (value: any) => {
  let returnValue: any;
  if (value !== '' && typeof (value) === 'string') {
    returnValue = JSON.parse(value);
  }
  else if (value === '') {
    returnValue = null;
  }
  else {
    returnValue = value;
  }
  return returnValue;
}