import React from 'react'
import ReactDom from 'react-dom'
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB-fnlxOHTS_iMgItzGwVQ0t6fGo6c2AUA",
    authDomain: "canzion-b49ff.firebaseapp.com",
    databaseURL: "https://canzion-b49ff.firebaseio.com",
    storageBucket: "canzion-b49ff.appspot.com",
    messagingSenderId: "879532925511"
  };
  firebase.initializeApp(config);

class App extends React.Component{
	constructor(){
		super()
		this.state = {
			name: 'Erik Rdz'
		}
	}
	componentWillMount() {
		const nameRef = firebase.database().ref().child('object').child('name')

		nameRef.on('value', (snapshot) => {
			this.setState({
				name: snapshot.val()
			})
		})
	}

	render(){
		return <h1>Hola {this.state.name}!</h1>
	}
}

class FileUpload extends React.Component {
	constructor(){
		super()
		this.state = {
			uploadValue: 0
		}

	}

	handleOnChange (event){
		const file = event.target.files[0]
		const storageRef = firebase.storage().ref('pictures/' + file.name)
		const task = storageRef.put(file)

		task.on('state_changed', (snapshot) => {
			let  porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			this.setState({
				uploadValue: porcentage	
			})
		},(error) => {
			this.setState ({
				message: error.message
			})
		}, () => {
			this.setState({
				message: 'Archivo Subido',
				picture: task.snapshot.downloadURL
			})
		})
	}

	render(){
		return (
			<div>	
				<progress value={this.state.uploadValue} max='100'></progress>
				<br />
				<input type='file' onChange={this.handleOnChange.bind(this)} />
				<br />
				{this.state.message}
				<br />
				<img width='100' src={this.state.picture} />
			</div>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'))

ReactDom.render(<FileUpload />, document.getElementById('fileupload'))
 