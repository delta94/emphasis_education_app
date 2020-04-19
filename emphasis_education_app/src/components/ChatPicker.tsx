import React from 'react';
import {
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import styled from 'styled-components';

interface IChatPickerProps {
  chats: Array<any>;
}

const IndChat = styled(TouchableOpacity)`
  border: black;
  width: 100%;
  height: 30px;
`;

const ChatPicker: React.FC<IChatPickerProps> = () => {
  return (
    <>
      <SafeAreaView>
        {/* would need to render as many chats as subjects */}
        {/* need to add a map */}
        <IndChat
          onPress={() => Alert.alert('going to the chat')}
        >
          <Text>
          Math
          </Text>

        </IndChat>
        <IndChat
          onPress={() => Alert.alert('going to the chat')}
        >
        <Text>
          History
        </Text>
        </IndChat>
      </SafeAreaView>
    </>
  )
}

export default ChatPicker;