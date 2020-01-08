import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {loggedIn: null};

  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC-c4qWx86vYEBroWPvi8hGG4ROlcfNFtE',
      authDomain: 'reactnative-auth-62426.firebaseapp.com',
      databaseURL: 'https://reactnative-auth-62426.firebaseio.com',
      projectId: 'reactnative-auth-62426',
      storageBucket: 'reactnative-auth-62426.appspot.com',
      messagingSenderId: '1098910651597',
      appId: '1:1098910651597:web:c57170eba556c62ff68584',
      measurementId: 'G-VMF2SF9851',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.spinnerView}>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerView: {
    height: '20%',
  },
});

export default App;
