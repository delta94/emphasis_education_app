import * as React from 'react';
import {
  Input
} from 'react-native-elements';
import {
  useLazyQuery
} from '@apollo/react-hooks'

import { CHECK_CODE } from '../../queries/CheckCode';

import {
  GeneralSpacing, MyButton, MyButtonText, ThemedText
} from '../shared';

interface IEnterCodeProps {
navigation: any;
  route: any;
}

const ErrorMessage: React.FC = () => (
  <ThemedText type='main' size={14} >
    You entered the wrong code
  </ThemedText>
)

const EnterCode: React.FC<IEnterCodeProps> = ({ navigation }) => {

  const [code, setCode] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)

  const [runQuery, {data, loading}] = useLazyQuery(CHECK_CODE)

  const onChangeTextCode = (val: string) => setCode(val)
  const onChangeTextEmail = (val: string) => setEmail(val);

  const _checkCode = () => runQuery({ variables: { email, code }})

  if (data) {
    console.log(data)
    if (data.checkCode.res) {
      console.log('entered the correct code')
      navigation.navigate('CreateUserContain')
    } else {
      console.log('entered the incorrect code')
    }
  }

  return (
    <GeneralSpacing u={10} r={10} d={10} l={10}>
      <Input
        placeholder='Enter your email'
        onChangeText={onChangeTextEmail}
      />
      <Input
        placeholder='Enter your code'
        onChangeText={onChangeTextCode}
      />
      { error && <ErrorMessage /> }
      <MyButton onPress={_checkCode}>
        <MyButtonText>
          Submit Code
        </MyButtonText>
      </MyButton>
    </GeneralSpacing>
  );
}

export default EnterCode;