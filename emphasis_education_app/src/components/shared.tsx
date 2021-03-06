import * as React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styled from 'styled-components';
import { Input } from 'react-native-elements';

import { Permission } from '../types';
import { theme } from '../theme';
import { MAX_WIDTH, MAX_HEIGHT } from '../constant';

import { GeneralContext } from './Context/Context';

export const MytextInput = styled(TextInput)`
  padding: 10px 0;
  fontFamily: ${({ theme }) => theme.font.main};
  fontSize: 18px;
`;

export const LoginInput = styled(TextInput)`
  fontFamily: ${({ theme }) => theme.font.main};
  fontSize: 18px;
  width: 80%;
  text-align: center;
`;

export const InputContain = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: black;
  width: 90%;
`;

interface ThemedInputProps {
  placeholder: string;
  value?: string;
  onChangeText(t: string): void;
}

export const ThemedTextInput: React.FC<ThemedInputProps> = props => (
  <InputContain>
    <MytextInput
      {...props}
    />
  </InputContain>
)

interface ThemedNumberInputProps extends ThemedInputProps {
  maxLength: number;
}

export const ThemedNumberInput: React.FC<ThemedNumberInputProps> = props => (
  <InputContain>
    <MytextInput
      {...props}
      keyboardType='number-pad'
      maxLength={props.maxLength}
    />
  </InputContain>
)

export const ButtonContainer = styled(View)`
  padding: 10px;
`;

export const ButtonGroupContain = styled(View)`
  padding-top: 20%;
`

export const MyButton = styled(TouchableOpacity)`
  background-color: ${({ disabled, theme}) => disabled ? 'grey' : theme.colors.purple} ;
  height: 40px;
  justify-content: center;
  border-radius: 10px;
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MyButtonText = styled(Text)`
  color: white;
  text-align: center;
  font-size: 14px;
  fontFamily: ${({ theme }) => theme.font.main}
  padding: 0 5px;
  position: relative;
`;

interface ButtonProps {
  buttonText: string;
  loading: boolean;
  disabled?: boolean;
  onPress(): void;
}

export const ThemedButton: React.FC<ButtonProps> = ({ onPress, buttonText, loading, disabled }) => (
  <MyButton onPress={onPress} disabled={disabled} >
    <MyButtonText>
      {buttonText}
    </MyButtonText>
    {loading && <ActivityIndicator animating={loading} />}
  </MyButton>
);

export const CenteredDiv = styled(View)`
  align-items: center;
`;

// TODO make this em or %. not straight px
export const IconSection = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: ${MAX_HEIGHT * 0.1}px;
`;

interface PermissionProps {
  allowedPermissions: Permission[];
}

export const PermissionedComponent: React.FC<PermissionProps> = ({ allowedPermissions, children}) => {
  const {loggedUser} = React.useContext(GeneralContext)

  if(allowedPermissions.includes(loggedUser.userType)) {
    return <>{children}</>
  } else {
    return null;
  }
}
const RADIO_BUTTON_OUTER_DIAMETER: number = 20;
const RADIO_BUTTON_INNER_DIAMETER: number = 10;

const RadioButtonOuter = styled(TouchableOpacity)`
  height: ${RADIO_BUTTON_OUTER_DIAMETER}px;
  width: ${RADIO_BUTTON_OUTER_DIAMETER}px;
  border-radius: ${RADIO_BUTTON_OUTER_DIAMETER/2}px;
  border-width: 2px;
  border-color: grey;
  align-items: center;
  justify-content: center;
`

const RadioButtonInner = styled(View)`
  height: ${RADIO_BUTTON_INNER_DIAMETER}px;
  width: ${RADIO_BUTTON_INNER_DIAMETER}px;
  border-radius: ${RADIO_BUTTON_INNER_DIAMETER/2}px;
  background-color: grey;
`
interface RadioButtonSelectProps {
  title: string;
  selectedElement: string;
  setSelectedElement(t: string): void;
}

const RadioButtonSelect: React.FC<RadioButtonSelectProps> = ({ title, selectedElement, setSelectedElement }) => (
  <RadioButtonOuter
    onPress={() => setSelectedElement(title)}
  >
    {title === selectedElement && <RadioButtonInner />}
  </RadioButtonOuter>
)

const RadioButtonContain = styled(View)<{num: number}>`
  width: ${props => 100/props.num}%
  align-items: center;
  justify-content: center;
`
interface RadioButtonProps {
  title: string;
  num: number;
  selectedElement: string;
  setSelectedElement(t: string): void;
}

const RadioButton: React.FC<RadioButtonProps> = ({title, num, selectedElement, setSelectedElement}) => (
  <RadioButtonContain
    num={num}
  >
    <RadioButtonSelect
      title={title}
      selectedElement={selectedElement}
      setSelectedElement={setSelectedElement}
    />
    <Text>{title}</Text>
  </RadioButtonContain>
)

const RadioButtonRow = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10%;
`
interface RadioButtonGroupProps {
  titles: string[]
  onSelect(el: string): void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ titles, onSelect }) => {
  // this is the conponent that should hold state over the individual radio buttons
  const [selectedElement, setSelectedElement] = React.useState('');
  const selectElement = (el: string) => {
    setSelectedElement(el);
    onSelect(el);
  };
  return (
    <RadioButtonRow>
      {titles.map((title, index) => (
        <RadioButton
          title={title}
          num={titles.length}
          selectedElement={selectedElement}
          setSelectedElement={selectElement}
          key={index}
        />
      ))}
    </RadioButtonRow>
  )
}

export const ContentContain = styled(View)`
  padding: 20px;
`
export enum FONT_STYLES {
  MAIN = 'main',
  LIGHT = 'light',
  BOLD = 'bold'
}

export const FONT_MAP: {[ x in FONT_STYLES ]: string } = {
  [FONT_STYLES.MAIN]: theme.font.main,
  [FONT_STYLES.LIGHT]: theme.font.light,
  [FONT_STYLES.BOLD]: theme.font.bold
}

export const ThemedText = styled(Text)<{ size: number, type: FONT_STYLES, error?: boolean }>`
  fontFamily: ${({ type }) => FONT_MAP[type]}
  fontSize: ${props => props.size}px;
  ${({ error }) => error && 'color: red'}
`

interface IndividualFieldProps {
  value: string;
  label: string;
  valueSize: number;
  labelSize: number;
  // be only able to edit the main user, so have these props be optional
  editing?: boolean;
  onChangeText?(text: string, label: string): void;
};

export const GeneralSpacing = styled(View)<{r: number, l: number, u: number, d: number}>`
  padding: ${({ u }) => u}px ${({ r }) => r}px ${({ d }) => d}px ${({ l }) => l}px
`;

export const IndividualField: React.FC<IndividualFieldProps> = ({
  value,
  label,
  valueSize,
  labelSize,
  editing,
  onChangeText
}) => (
  <GeneralSpacing u={5} r={0} d={5} l={0}>
    {!editing ? (
      <>
        <ThemedText
          size={valueSize}
          type={FONT_STYLES.MAIN}
        >
          {value}
        </ThemedText>
        <ThemedText
          size={labelSize}
          type={FONT_STYLES.LIGHT}
        >
          {label}
        </ThemedText>
      </>
    ) : (
      <Input
        placeholder={label}
        defaultValue={value}
        style={{
          padding: 0
        }}
        onChangeText={text => {
          if(onChangeText) {
            onChangeText(text, label)
          }
        }}
      />
    )}
  </GeneralSpacing>
);

export const HorizontalDivider = styled(View)<{width: number, color: string}>`
  width: ${({ width }) => width}%;
  border-bottom-color: ${({ color }) => color};
  border-bottom-width: 1px;
`;

export const VerticalDivider = styled(View)<{height: number}>`
  height: ${({ height }) => height}px;
  border-right-color: grey;
  border-right-width: 1px;
`;

export const IconRow = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TitleText: React.FC<{ title: string }> = ({ title }) => (
  <ThemedText size={20} type={FONT_STYLES.MAIN}>
    {title}
  </ThemedText>
);
