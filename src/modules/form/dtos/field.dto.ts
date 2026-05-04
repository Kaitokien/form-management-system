import { OptionalStringInput, RequiredBooleanInput, RequiredNumberInput, RequiredStringInput } from 'src/common/common-dto';

export class CreateFieldDto {
  @RequiredStringInput()
  label: string;

  @RequiredStringInput()
  type: string;

  @RequiredNumberInput()
  order: number;

  @RequiredBooleanInput()
  required: boolean;

  @OptionalStringInput()
  options: string;
}
