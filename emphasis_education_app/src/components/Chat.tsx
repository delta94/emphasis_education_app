import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'

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
        _id: "2",
        name: 'Test User',
        // avatar: 'https://placeimg.com/140/140/any'
      },
    },
    {
      _id: 2,
      text: 'this is another test message',
      createdAt: new Date().getTime(),
      user: {
        _id: "3",
        name: 'diff Test User',
        // avatar: 'https://placeimg.com/140/140/any'
      },
    }
  ]

  const [curState, setState] = useState({messages})

  const SEND_MESSAGE = gql`
    mutation sendMessage($messages: [MessageTypeInput]) {
      sendMessage(messages: $messages) {
        _id
        text
        MessageId
        name
      }
    }
  `;

  const [sendMessage, {loading, error}] = useMutation(
    SEND_MESSAGE,
    {
      onCompleted: ( props ) => {
        console.log('inc lient, done sending message');
        console.log(props.sendMessage);
        setState({
          messages: [
            ...curState.messages,
            {
              // IDs need to be unique
              _id: props.sendMessage.MessageId,
              text: props.sendMessage.text,
              createdAt: new Date().getTime(),
              user: {
                _id: props.sendMessage._id,
                name: props.sendMessage.name
              },
            }
          ]
        })
      }
    }
  )

  if (error) console.log('ERROR in CHAT rip');

  interface IMessageUserType {
    _id: string,
    name: string,
    email: string
  }
  // create the user here in the useEffect
  const curUser: IMessageUserType = {
    _id: props.route.params._id,
    name: props.route.params.name,
    email: props.route.params.email,
  }

  const GET_ID = gql`
    {
      getUserID
    }
  `;

  const getID = (): string => {
    const { data } = useQuery(GET_ID);
    return data;
  }

  const user = () => {
    const { navigation, route } = props;
    const { data } = useQuery(GET_ID);
    // const data = getID();
    // console.log('the ID data: ', data);
    // not sure what the type of these ids need to be
    const test: string = "500";

    return {
      name: route.params.name,
      email: route.params.email,
      _id: route.params._id
    };
  }
  return (
    <GiftedChat
      messages={curState.messages}
      inverted={false}
      renderBubble={(props) => (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'yellow',
            },
            left: {}
          }}
          // user={{
          //   _id:400
          // }}
          wrapperStyle={{
            left: {
              backgroundColor: 'pink',
            },
            right: {
              // backgroundColor: 'yellow'
            }
          }}
        />

      )}
      // onSend={(props)=> console.log(props)}
      onSend={(props) => {
        // console.log(props)
        sendMessage({
          variables: {
            messages: [
              {
                id: 'has to be a string',
                text: props[0].text,
                user: curUser
              }
            ]
          }
      })
      }}
      user={curUser}
    />
  )

}

export default Chat;
