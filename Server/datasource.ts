// import * as firebase from 'firebase';
import firebaseSvc from './firebaseSvc';
import { RESTDataSource } from 'apollo-datasource-rest';

import { messageType } from './types/messageType';

class dataSource extends RESTDataSource {
  constructor() {
    super();
  }

  getEverything() {
    const resp = firebaseSvc.get_stuff();
    console.log('the response');
    console.log(resp);
  }

  async login(user) {
    console.log(user)
    let res: boolean = true;
    await firebaseSvc.login(
      user,
      () => res = true,
      () => res = false
    )
    return res
  }

  async sendMessages(message: [messageType]) {
    console.log('in data source sending messages');
    console.log(message)
    await firebaseSvc.send(message)
  }
}

export default dataSource;
