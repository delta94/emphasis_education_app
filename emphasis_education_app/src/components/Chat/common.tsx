import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import {
  CenteredDiv,
  GeneralSpacing,
  ThemedText,
  IconRow,
  FONT_STYLES,
} from '../shared';
import styled from 'styled-components';

const EmptyChatWrapper: React.FC = ({ children }) => (
  <CenteredDiv>
    <GeneralSpacing u={10} r={10} d={10} l={10}>
      <ThemedText size={16} type={FONT_STYLES.LIGHT}>
        {children}
      </ThemedText>
    </GeneralSpacing>
  </CenteredDiv>
);

export const EmptyChatPicker: React.FC = () => (
  <EmptyChatWrapper>
    You are currently not added to any Chats.
    Please reach out to either Shweta or Sakthi to be added to one.
  </EmptyChatWrapper>
);

export const EmptyChat: React.FC = () => (
  <EmptyChatWrapper>
    This is the beginning of your conversation. Let's talk!
  </EmptyChatWrapper>
);

export const LoadingScreen: React.FC<{ loading: boolean }> = ({ loading }) => (
  <View>
    <Text>
      the chat is deleting
    </Text>
    <ActivityIndicator animating={loading} />
  </View>
)

export const IconRowLeft = styled(IconRow)`
  justify-content: flex-start;
`;

export const LeftText = styled(ThemedText)`
  padding-right: 5px;
`

export const RightText = styled(ThemedText)`
  padding-left: 5px;
`

export const SpacedItemRow = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const NotificationBadge = styled(View)`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: grey;
  margin-right: 10px;
`

export const ChatContain: React.FC = ({ children }) => (
  <GeneralSpacing u={10} r={10} d={10} l={10}>
    {children}
  </GeneralSpacing>
);