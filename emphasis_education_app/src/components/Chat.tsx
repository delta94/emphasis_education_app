import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { cursorTo } from 'readline';

interface IChatProps {
  // TODO should the ID be of type number or ID
  id: number;
  userName: string;
  email: string;
  navigation: any;
  route: any;
}

const Chat: React.FC<IChatProps> = props => {

  const t: number = new Date().getTime();

  const messages =  [
    {
      _id: 1,
      text: 'this is a test message',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
        // avatar: 'https://placeimg.com/140/140/any'
      }
    },
    {
      _id: 2,
      text: 'this is another test message',
      createdAt: new Date().getTime(),
      user: {
        _id: 3,
        name: 'diff Test User',
        // avatar: 'https://placeimg.com/140/140/any'
      }
    }
  ]

  const [curState, setState] = useState({messages})

  const SEND_MESSAGE = gql`
    mutation sendMessage($messages: [MessageTypeInput]) {
      sendMessage(messages: $messages)
    }
  `;

  const [sendMessage, {loading, error}] = useMutation(
    SEND_MESSAGE,
    {
      onCompleted: ({ props }) => {
        // this should update the chat UI?
        console.log(props);
        setState({
          messages: [
            ...curState.messages,
            {
              // IDs need to be unique
              _id: 400,
              text: 'this is a confirmation',
              createdAt: new Date().getTime(),
              user: {
                _id: 4,
                name: 'Adithya Bellary'
              }
            }
          ]
        })
      }
    }
  )

  if (error) console.log('ERROR in CHAT rip');

  useEffect(() => {
    console.log('in use effect')
  })

  const user = () => {
    const { navigation, route } = props;

    // not sure what the type of these ids need to be
    const test: number = 1

    return {
      name: route.params.name,
      email: route.params.email,
      // id: firebaseSvc.uid(),
      // _id: firebaseSvc.uid()

      // query for this shit
      id: test,
      _id: test
    };
  }
  return (
    <GiftedChat
      messages={curState.messages}
      inverted={false}
      // onSend={(props)=> console.log(props)}
      onSend={(props) => {
        sendMessage({
          variables: {
            messages: [
              {
                id: 'has to be a string',
                text: props[0].text,
                // createdAt: props[0].createdAt,
                user: {
                  // _id: props[0].user._id,
                  name: props[0].user.name,
                  email: 'test_email'
                }

              }
            ]
          }
      })
      }}
      // we have a firebase.User if we need it
      user={user()}
    />
  )

}

export default Chat;
