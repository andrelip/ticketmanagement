export const onChangeField = (field, value) => {
  return {type: 'change_field', payload: {field: field, value: value}}
};