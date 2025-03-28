const allCharacters =
  'a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýếẾ';

const rules = {
  dacbiet: [
    {
      pattern: new RegExp(`^[0-9${allCharacters} \n]+$`),
      message: 'Không chứa kí tự đặc biệt',
    },
  ],
  ten: [
    {
      max: 50,
      message: 'Không quá 50 kí tự',
    },
    {
      whitespace: true,
      message: 'Toàn kí tự trắng không hợp lệ',
    },
    {
      pattern: new RegExp(`^[${allCharacters} ]+$`),
      message: 'Tên chỉ bao gồm chữ cái',
    },
  ],
  text: [
    {
      whitespace: true,
      message: 'Toàn kí tự trắng không hợp lệ',
    },
  ],
  inputNumber: [
    {
      pattern: new RegExp('^[0-9]+$'),
      message: 'Chỉ được nhập số',
    },
  ],
};

export default rules;
