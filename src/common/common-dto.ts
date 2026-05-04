import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsDateString, IsArray, ValidateNested, IsOptional, registerDecorator, IsObject, IsEnum, IsBoolean, ArrayNotEmpty, IsNumber, Matches } from 'class-validator'
import { applyDecorators } from '@nestjs/common'
import { Transform, Type } from 'class-transformer'

// ---------------------------HELPER FUNCTION---------------------------

function IsArrayUnique() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} should contain unique elements` },
      validator: {
        validate(value: any[]) {
          if (!Array.isArray(value)) {
            return false
          }
          const serializedValues = value.map((item) => JSON.stringify(item))
          const uniqueValues = new Set(serializedValues)
          return serializedValues.length === uniqueValues.size
        },
      },
    })
  }
}

function IsArrayContainsOnlyEnum(enumObject: object) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayContainsOnlyEnum',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} must contain only one or many of the following values: ${Object.values(enumObject).join(', ')}` },
      validator: {
        validate(value: any[]) {
          if (!Array.isArray(value)) {
            return false
          }
          return value.every((element) => Object.values(enumObject).includes(element))
        },
      },
    })
  }
}

function IsRequiredStringCustomMsg(customMsg) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRequiredStringCustomMsg',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: customMsg },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0
        },
      },
    })
  }
}

// ---------------------------STRING---------------------------

export function RequiredStringInput() {
  return applyDecorators(ApiProperty({ required: true, example: '' }), IsString(), IsNotEmpty())
}

export function RequiredStringInputCustomMsg(customMsg: string) {
  return applyDecorators(ApiProperty({ required: true, example: '' }), IsRequiredStringCustomMsg(customMsg))
}

export function OptionalStringInput() {
  return applyDecorators(ApiProperty({ required: false, example: '' }), IsString(), IsOptional())
}

// ---------------------------NUMBER---------------------------

export function RequiredNumberInput() {
  return applyDecorators(
    ApiProperty({ required: true, example: 0 }),
    Transform(({ value }) => {
      if (value === null || value === undefined) return value
      return Number(value)
    }),
    IsNumber(),
    IsNotEmpty()
  )
}

export function OptionalNumberInput() {
  return applyDecorators(ApiProperty({ required: false, example: 0 }), IsNumber(), IsOptional())
}

// ---------------------------DATE---------------------------

export function RequiredDateStringInput() {
  return applyDecorators(
    ApiProperty({ required: true, example: '2025-01-01' }),
    IsString(),
    Matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in the format YYYY-MM-DD',
    }),
    IsNotEmpty()
  )
}

export function OptionalDateStringInput() {
  return applyDecorators(
    ApiProperty({ required: false, example: '2025-01-01' }),
    IsString(),
    Matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in the format YYYY-MM-DD',
    }),
    IsOptional()
  )
}

export function RequiredTimestampInput() {
  return applyDecorators(ApiProperty({ required: false, example: '2024-01-01T00:00:00.000Z' }), IsDateString(), IsNotEmpty())
}

export function DataObjectInput() {
  return applyDecorators(IsOptional(), IsObject(), ValidateNested({ always: true }))
}

// ---------------------------BOOLEAN---------------------------

export function OptionalBooleanInput() {
  return applyDecorators(ApiProperty({ required: false, example: false }), IsBoolean(), IsOptional())
}

export function RequiredBooleanInput() {
  return applyDecorators(ApiProperty({ required: true, example: false }), IsBoolean(), IsNotEmpty())
}

// ---------------------------ENUM OBJECT & ARRAY---------------------------

export function OptionalEnumInput(enumObject: object) {
  return applyDecorators(ApiProperty({ required: false, enum: enumObject }), IsString(), IsOptional(), IsEnum(enumObject))
}

export function RequiredEnumInput(enumObject: object) {
  return applyDecorators(ApiProperty({ required: true, enum: enumObject }), IsEnum(enumObject))
}

export function OptionalObjectInput(object: any) {
  return applyDecorators(
    ApiProperty({ required: false, type: () => object }),
    IsObject(),
    IsOptional(),
    ValidateNested({ always: true }),
    Type(() => object)
  )
}

export function RequiredObjectInput(object: any) {
  return applyDecorators(
    ApiProperty({ required: true, type: () => object }),
    IsObject(),
    IsNotEmpty(),
    ValidateNested({ always: true }),
    Type(() => object)
  )
}

// ---------------------------ARRAY---------------------------

export function RequiredArrayInput(type: any, example?: any) {
  return applyDecorators(
    ApiProperty({
      required: true,
      type: [type],
      example: example ? [example] : [],
    }),
    IsArray(),
    ValidateNested({ each: true }),
    IsNotEmpty(),
    ArrayNotEmpty(),
    Type(() => type)
  )
}

export function OptionalArrayInput(type: any, example?: any) {
  return applyDecorators(
    ApiProperty({
      required: false,
      type: [type],
      example: example ? [example] : [],
    }),
    IsArray(),
    ValidateNested({ each: true }),
    IsOptional(),
    Type(() => type)
  )
}

export function RequiredPrimitiveArrayInput(type: 'string' | 'number' | 'boolean', example?: any) {
  return applyDecorators(
    ApiProperty({
      required: false,
      type: [type === 'string' ? String : type === 'number' ? Number : Boolean],
      example: example ? [example] : [],
    }),
    IsArray(),
    Type(() => (type === 'string' ? String : type === 'number' ? Number : Boolean)),
    IsNotEmpty(),
    ...(type === 'string' ? [IsString({ each: true })] : type === 'number' ? [IsNumber({}, { each: true })] : [IsBoolean({ each: true })])
  )
}

export function OptionalPrimitiveArrayInput(type: 'string' | 'number' | 'boolean', example?: any) {
  return applyDecorators(
    ApiProperty({
      required: false,
      type: [type === 'string' ? String : type === 'number' ? Number : Boolean],
      example: example ? [example] : [],
    }),
    IsArray(),
    Type(() => (type === 'string' ? String : type === 'number' ? Number : Boolean)),
    IsOptional(),
    ...(type === 'string' ? [IsString({ each: true })] : type === 'number' ? [IsNumber({}, { each: true })] : [IsBoolean({ each: true })])
  )
}

export function OptionalFreeTypeArrayInput(example?: any) {
  return applyDecorators(ApiProperty({ required: false, type: [String], example: example ? [example] : [] }), IsArray(), IsOptional())
}

export function CheckBoxInput(enumObject: object) {
  return applyDecorators(ApiProperty({ required: false, enum: enumObject, example: [Object.values(enumObject)[0]] }), IsArray(), IsOptional(), IsArrayContainsOnlyEnum(enumObject))
}
