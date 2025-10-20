import { Button } from '@atomic/atm.button';
import { Card } from '@atomic/atm.card';
import { CheckboxInput } from '@atomic/atm.checkbox/checkbox-input.component';
import { DatePickerInput } from '@atomic/atm.date-picker';
import { Divider } from '@atomic/atm.divider';
import { FaIcon } from '@atomic/atm.fa-icon';
import { FileInput } from '@atomic/atm.file-input/file-input.component';
import { RadioInput } from '@atomic/atm.radio/radio-input.component';
import { SelectInput } from '@atomic/atm.select/select-input.component';
import { StepperInput } from '@atomic/atm.stepper-input/stepper-input.component';
import { SwitchInput } from '@atomic/atm.switch/switch-input.component';
import { TextAreaInput } from '@atomic/atm.text-input/text-area-input.component';
import { TextInput } from '@atomic/atm.text-input/text-input.component';
import { TextFieldMasks } from '@atomic/atm.text-input/text-input-masks';
import { Body, BodySecondary, H1, H3, H4, InputLabel } from '@atomic/atm.typography';
import { DragNDropFile } from '@atomic/mol.drag-n-drop-file/drag-n-drop-file.component';
import {
  type ArrayPathType,
  type FieldArrayPathValueType,
  type FieldValuesType,
  Form,
  FormField,
  type PathType,
  type SubmitHandler,
} from '@atomic/obj.form';
import { FormFieldCaption } from '@atomic/obj.form/form-field-caption.component';
import { useDynamicFormFieldArray } from '@atomic/obj.form/hook/dynamic-form-field-array.hook';
import { useFormFieldWatch } from '@atomic/obj.form/hook/form-field-watch.hook';
import * as Validators from '@atomic/obj.form/validators';
import { Col, Grid, Row } from '@atomic/obj.grid';
import { Separator } from '@atomic/obj.separator';
import React from 'react';

export const FormsPage: React.FC = () => {
  return (
    <Grid fluid>
      <Row>
        <H1>Forms</H1>
      </Row>
      <Row>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Password with equal validation</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <PasswordExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Dynamic Form fields</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <DynamicFormExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Form fields</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <TextExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Masked field</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <MaskedFieldExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Validators</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <ValidatorsExamplesComponent />
            </Card.Item>
          </Card>
        </Col>
        <Col xs={12} md={6} className="intro-y">
          <Card>
            <Card.Item>
              <H3>Select field</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <SelectExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>File field</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <FileExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Stepper field</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <StepperExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Switch </H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <SwitchExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Date time picker</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <InputLabel>Date and time</InputLabel>
              <DatePickerInput placeholder="Click here to select" showTimeSelect />
            </Card.Item>
            <Card.Item>
              <InputLabel>Date</InputLabel>
              <DatePickerInput placeholder="Click here to select" />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Checkbox</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <CheckboxExamplesComponent />
            </Card.Item>
          </Card>

          <Card className="my-md">
            <Card.Item>
              <H3>Radio</H3>
            </Card.Item>
            <Divider className="my-md" />
            <Card.Item>
              <RadioExamplesComponent />
            </Card.Item>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

interface RadioFormValues {
  radio: string;
  disabledRadio: string;
}

function RadioExamplesComponent() {
  const handleSubmit: SubmitHandler<RadioFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body>
        Keyboard testing: Focus on the radio group by pressing Tab once, then use arrow keys to change the current
        selection. Press Tab again to exit the radio group.
      </Body>
      <Separator />

      <FormField<RadioFormValues> name="radio" validators={[Validators.RequiredValidator()]}>
        <RadioInput radioId="1">Value 1</RadioInput>
        <RadioInput radioId="2">Value 2</RadioInput>
        <RadioInput radioId="3">Value 3</RadioInput>
      </FormField>

      <FormField<RadioFormValues> name="disabledRadio" disabled defaultValue="2">
        <RadioInput radioId="1">Value 1</RadioInput>
        <RadioInput radioId="2">Value 2</RadioInput>
        <RadioInput radioId="3">Value 3</RadioInput>
      </FormField>
      <Separator />

      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface CheckboxFormValues {
  checkbox: string[];
  disabledCheckbox: string[];
  disabledCheckboxTwo: string[];
}

function CheckboxExamplesComponent() {
  const handleSubmit: SubmitHandler<CheckboxFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body>Keyboard testing: Focus with the Tab key, then toggle the focused checkbox with the Space key</Body>
      <Separator />

      <FormField<CheckboxFormValues>
        name="checkbox"
        label="Uncontrolled with initial value"
        validators={[Validators.RequiredValidator()]}>
        <CheckboxInput checkboxId="3">Value 3</CheckboxInput>
        <CheckboxInput checkboxId="4">Value 4</CheckboxInput>
        <CheckboxInput checkboxId="5">Value 5</CheckboxInput>
      </FormField>

      <FormField<CheckboxFormValues> name="disabledCheckbox" label="Disabled" disabled defaultValue={['4']}>
        <CheckboxInput checkboxId="3">Value 3</CheckboxInput>
        <CheckboxInput checkboxId="4">Value 4</CheckboxInput>
        <CheckboxInput checkboxId="5">Value 5</CheckboxInput>
      </FormField>
      <Separator />

      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface SwitchFormValues {
  switch: boolean;
}

function SwitchExamplesComponent() {
  const handleSubmit: SubmitHandler<SwitchFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<SwitchFormValues> name="switch">
        <SwitchInput id={15} ariaLabel="Switch" />
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface StepperFormValues {
  stepper: number;
  outlinedStepper: number;
}

function StepperExamplesComponent() {
  const handleSubmit: SubmitHandler<StepperFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <H4>Filled</H4>
      <FormField<StepperFormValues> name="stepper">
        <StepperInput maxValue={10} minValue={1} />
      </FormField>
      <br />
      <H4>Outlined</H4>
      <FormField<StepperFormValues> name="outlinedStepper">
        <StepperInput maxValue={10} minValue={1} outlined />
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface FileFormValues {
  file: FileList;
  dragNDropFile: FileList;
}

function FileExamplesComponent() {
  const handleSubmit: SubmitHandler<FileFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<FileFormValues>
        name="file"
        label="Single file field"
        validators={[Validators.RequiredValidator('Required validator')]}>
        <FileInput />
      </FormField>

      <FormField<FileFormValues> name="dragNDropFile" label="Drag and drop field">
        <DragNDropFile
          dragMessage="Arraste aqui ou clique para selecionar"
          dropMessage="Soltar aqui"
          onChange={data => console.log(data)}
          isMultipleFiles
        />
      </FormField>
      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface SelectFormValues {
  select: string;
}

function SelectExamplesComponent() {
  const handleSubmit: SubmitHandler<SelectFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body>
        Keyboard testing: focus with the Tab key, open the option list by pressing the Space key or the up/down arrows,
        use the up/down arrows to focus on an option and then confirm the selection with the Space or Enter keys
      </Body>
      <Separator />

      <FormField<SelectFormValues> name="select">
        <SelectInput>
          <option value={undefined}>Select</option>
          {[
            { code: 'RJ', state: 'Rio de Janeiro' },
            { code: 'SP', state: 'São Paulo' },
          ].map(option => (
            <option value={option.code} key={option.code}>
              {option.state}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface ValidatorsFormValues {
  requiredField: string;
  cpfField: string;
}

function ValidatorsExamplesComponent() {
  const handleSubmit: SubmitHandler<ValidatorsFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<ValidatorsFormValues>
        name="requiredField"
        label="Required field"
        validators={[Validators.RequiredValidator('Required validator')]}>
        <TextInput />
      </FormField>

      <FormField<ValidatorsFormValues>
        name="cpfField"
        label="CPF validator"
        validators={[Validators.CpfValidator('Invalid CPF format')]}>
        <TextInput mask={TextFieldMasks.cpf()} />
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>

      <H4 className="my-sm mt-lg">All validators:</H4>
      <Row>
        {Object.keys(Validators).map(mask => {
          return (
            <Col xs={6} className="text-sm" key={mask}>
              <BodySecondary>{mask}</BodySecondary>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
}

interface MaskedFieldFormValues {
  masked: string;
}

function MaskedFieldExamplesComponent() {
  const handleSubmit: SubmitHandler<MaskedFieldFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<MaskedFieldFormValues> name="masked" label="With CPF mask">
        <TextInput mask={TextFieldMasks.cpf()} />
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>

      <H4 className="my-sm mt-lg">Other masks:</H4>
      <Row>
        {Object.keys(TextFieldMasks).map(mask => {
          return (
            <Col xs={4} className="list-disc text-sm" key={mask}>
              <BodySecondary>{mask}</BodySecondary>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
}

interface TextFormValues {
  basic: string;
  withIcon: string;
  dismissable: string;
  password: string;
  disabled: string;
  textarea: string;
}

function TextExamplesComponent() {
  const handleSubmit: SubmitHandler<TextFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<TextFormValues> name="basic" label="Basic field">
        <TextInput />
      </FormField>

      <FormField<TextFormValues> name="withIcon" label="With icon">
        <TextInput icon={<FaIcon.Search />} />
      </FormField>

      <FormField<TextFormValues> name="dismissable" label="Dismissable" defaultValue="default value">
        <TextInput dismissable />
      </FormField>

      <FormField<TextFormValues> name="password" label="Password">
        <TextInput type="password" />
      </FormField>

      <FormField<TextFormValues> name="disabled" label="Disabled" disabled defaultValue="This is a disabled field">
        <TextInput />
      </FormField>

      <FormField<TextFormValues> name="textarea" label="Textarea with placeholder">
        <TextAreaInput placeholder="This is a placeholder" />
      </FormField>

      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

function PasswordExamplesComponent() {
  const handleSubmit: SubmitHandler<PasswordFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<PasswordFormValues> name="password" label="Password" validators={[Validators.RequiredValidator()]}>
        <TextInput type="password" />
      </FormField>

      <ConfirmPasswordComponent<PasswordFormValues> passwordFieldName="password" />

      <Separator />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const ConfirmPasswordComponent = <T extends FieldValuesType>({
  passwordFieldName,
}: {
  passwordFieldName: PathType<T>;
}) => {
  const passwordValue = useFormFieldWatch<T>(passwordFieldName);

  return (
    <FormField name="confirmPassword" validators={[Validators.MustBeEqualValidator(passwordValue)]}>
      <TextInput type="password" />
    </FormField>
  );
};

interface Alternative {
  text: string;
  points: number;
}

interface DynamicFormValues {
  question: string;
  options: Alternative[];
}

const DynamicFormExamplesComponent: React.FC = () => {
  const handleSubmit: SubmitHandler<DynamicFormValues> = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField<DynamicFormValues> name="question" label="Question">
        <TextInput />
      </FormField>
      <Separator />

      <DynamicOptionsForm<DynamicFormValues> name="options" />
      <Separator />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

const DynamicOptionsForm = <T extends FieldValuesType>({ name }: { name: ArrayPathType<T> }) => {
  const { fields, append, remove, error } = useDynamicFormFieldArray<T>({
    name,
    validators: [
      Validators.RequiredValidator(),
      Validators.MinLengthValidator(2, 'At least 2 alternatives are required'),
    ],
  });

  const handleAddField = () => {
    append({ text: '', points: 0 } as FieldArrayPathValueType<T>);
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <>
      <InputLabel hasError={!!error}>Alternatives</InputLabel>
      <FormFieldCaption error={error} />
      <Separator />

      <Button onClick={handleAddField}>Add alternative</Button>
      <Separator />

      {fields.map((item, index) => (
        <React.Fragment key={item.id}>
          <FormField<DynamicFormValues>
            name={`options.${index}.text` as const}
            label={`Alternative ${index + 1}`}
            validators={[Validators.RequiredValidator()]}>
            <TextInput />
          </FormField>
          <Separator />

          <FormField<DynamicFormValues> name={`options.${index}.points` as const} label="Points">
            <StepperInput maxValue={10} minValue={0} />
          </FormField>
          <Separator />

          <Button onClick={() => handleRemoveField(index)}>Remove alternative</Button>
          <Separator />
        </React.Fragment>
      ))}
    </>
  );
};
