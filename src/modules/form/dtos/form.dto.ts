import { OptionalStringInput, RequiredNumberInput, RequiredStringInput } from 'src/common/common-dto';

export class CreateFormDto {
  @RequiredStringInput()
  title: string;

  @OptionalStringInput()
  description: string;

  @RequiredNumberInput()
  order: number;

  @RequiredStringInput()
  status: string;
}
