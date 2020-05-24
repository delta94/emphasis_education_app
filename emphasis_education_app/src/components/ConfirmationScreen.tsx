import * as React from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  ButtonContainer,
  MyButton,
  MyButtonText,
} from './shared';

interface IConfirmationScreenProps {
  // navigation: any;
  // route: any;
  users: any;
  submit(): void;
}

// we need to be able to edit info from here
const ConfirmationScreen: React.FC<IConfirmationScreenProps> = ({ users, submit }) => {
  console.log('props', users)
  // display the data just entered

  return (
    <View>
      <Text>
        Confirming
      </Text>
      <ButtonContainer>
        <MyButton>
          <MyButtonText
            onPress={submit}
          >
            Add another member
          </MyButtonText>
        </MyButton>
      </ButtonContainer>

    </View>
  )
}

export default ConfirmationScreen;
