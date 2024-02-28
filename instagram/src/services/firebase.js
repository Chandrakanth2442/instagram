import {firebase, FieldValue} from '../lib/firebase'

export async function doesUsernameExist(username) {
    //debugger
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get();
  console.log("Result:"+result)
  console.log('result.docs:'+ result.docs);
    return result.docs.length > 0;
  }
