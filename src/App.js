import React, { Component } from 'react';

import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 75,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
  },
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (region) => {
    const boundingBox = region.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - (boundingBox.right_col * width),
      bottomRow: height - (boundingBox.bottom_row * height)
    }
  }

  getRegionsArray = (data) => {
    return data.outputs[0].data.regions;
  }

  addFaceBox = (newBox) => {
    this.setState({ boxes: [...this.state.boxes, newBox] })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
        }
        this.getRegionsArray(response).map(region =>
          this.addFaceBox(this.calculateFaceLocation(region)))
      })
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, user } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn} />

        {route === 'home'
          ? <div>
            <Rank
              name={user.name}
              entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPictureSubmit} />
            <FaceRecognition
              boxes={boxes}
              imageUrl={imageUrl} />
          </div>
          : (route === 'signIn'
            ? <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} />
            : <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
