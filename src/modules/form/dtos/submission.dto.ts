import { RequiredArrayInput, RequiredNumberInput, RequiredStringInput } from 'src/common/common-dto';

class FieldValue {
  @RequiredNumberInput()
  fieldId: number;

  @RequiredStringInput()
  value: string;
}

export class SubmissionDto {
  @RequiredArrayInput(FieldValue, {
    fieldId: 1,
    value: "Lorem ipsum dolor sit amet"
  })
  FieldValues: FieldValue[];
}