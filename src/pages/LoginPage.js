import React from 'react';
import firebase from 'firebase';
import { View, Button,TextInput, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import FormRow from '../components/FormRow'
export default class LoginPage extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			email:'',
			senha:'',
			isLoading: false,
			message: ""
		};

	}
	componentDidMount(){
    	var firebaseConfig = {
		    apiKey: "AIzaSyDLlxZLnwNtYgYAYNzu2KG1NvX8-BYELIY",
		    authDomain: "ileaf-776e2.firebaseapp.com",
		    projectId: "ileaf-776e2",
		    storageBucket: "ileaf-776e2.appspot.com",
		    messagingSenderId: "154720189005",
		    appId: "1:154720189005:web:aee81162bd7eecdbf93a04",
		    measurementId: "G-JWGT7EC864"
	  	};
	  	firebase.initializeApp(firebaseConfig);
  	}


	onChangeHandler(field , value){
		this.setState({ [field]: value });
	};

	AcessarApp(){
		this.setState({ isLoading: false});
		this.props.navigation.replace('Habitos');
	}

	getMsgByErrorCode(errorCode){
		switch(errorCode){
			case "auth/wrong-password":
				return "Senha incorreta";
			case "auth/invalid-email":
				return "E-mail inválido";
			case "auth/user-not-found":
				return "Usuário não encontrado";
			case "auth/user-disabled":
				return "Usuário desativado";
			case "auth/email-already-in-use":
				return "E-mail já está em uso";
			case "auth/operation-not-allowed":
				return "Operação não permitida";
			case "auth/weak-password":
				return "Senha muito fraca!";
			default:
				return "Erro desconhecido!";
		}
	}

	login(){
		this.setState({isLoading:true, message:''});
		const{email, senha} = this.state;
		return firebase
			.auth()
			.signInWithEmailAndPassword(email,senha)
			.then(user=>{
				this.acessarApp();
			})
			.catch(error=>{
				this.setState({
					message:this.getMsgByErrorCode(error.code),
					isLoading: false
				})
			})
	}
	cadastrar(){
		const{email, senha} = this.state;
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, senha)
			.then(user => {
				this.acessarApp();
			})
			.catch(error=>{
				this.setState({	message:this.getMsgByErrorCode(error.code),
								isLoading: false})
			})

	}
	solicitaCadastro(){
		const {email, senha} = this.state;
		if(!email || !senha){
			Alert.alert(
				"Cadastramento!",
				"Para se cadastrar informe e-mail e senha"
				);
			return null;
		}
		Alert.alert(
			"Cadastramento!",
			"Deseja cadastrar seu usuário com os dados informados?",
			[{
				text:"Cancelar",
				style:'cancel'
			},
			{
				text:"Cadastrar",
				onPress:()=>{this.cadastrar()}
			}]
			)
	}

	renderButton(){
		if(this.state.isLoading)
			return <ActivityIndicator size="large" style={styles.loading} />;
	
		return(
			<View>
				<View style={styles.viewBtn}>
					<TouchableOpacity style={styles.btn} onPress={()=>this.login()}>
						<Text style={styles.text} >Login</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.viewBtn}>
					<TouchableOpacity style={styles.btn} onPress={()=>this.solicitaCadastro()}>
						<Text style={styles.text}>Cadastro</Text>
					</TouchableOpacity>
				</View>
			</View>


		)
	}

	renderMessage(){
		const {message} = this.state;
		if(!message)
			return null;

		Alert.alert(
			"Erro!",
			message.toString(),
			[{
				text:'OK',
				onPress:()=>{this.setState({message:''});}
			}]
			)
	}

	render(){
		return(
			<KeyboardAvoidingView enabled style={{flex:1}}>
				<ScrollView style={styles.container}>
					<View style={styles.logoView}>
						<Image 	source={require('../img/leaf.jpg')}
								style={styles.logo}/>
						<Text style={styles.title}>
							iLeaf
						</Text>
					</View>
					<FormRow>
						<TextInput 	style={styles.input} 
									placeholder="E-mail" 
									keyboardType="email-address"
									value={this.state.email}
									onChangeText={ value => this.onChangeHandler('email',value)}
								/>
					</FormRow>
					<FormRow>
						<TextInput 	style={styles.input} 
									placeholder="Senha" 
									value={this.state.senha}
									secureTextEntry
									onChangeText={ value => this.onChangeHandler('senha',value)}/>
					</FormRow>
					{this.renderButton()}
					{this.renderMessage()}
				</ScrollView>
			</KeyboardAvoidingView>
			)
	}
}
const styles = StyleSheet.create({
	container:{
		paddingRight:10,
		paddingLeft:10,
		backgroundColor:'#fff'
	},
	input:{
		paddingLeft:5,
		paddingRight:5,
		borderWidth:1,
		borderColor:'#ABABAB',
		height:50
	},
	viewBtn:{
		paddingTop:30
	},
	btn:{
		width: 250,
	    height: 48,
	    justifyContent: 'center',
	    alignSelf: 'center',
	    borderRadius: 10,
	    backgroundColor: '#39A845',
	},
	text:{
		color:"#fff",
		fontSize:17,
		alignSelf:'center',
		fontWeight:"900",
	},
	logo:{

		flex: 1,
	    width: 150,
	    height: 150,
	    resizeMode: 'contain'
	},
	title:{
		fontFamily:"Roboto",
		color:'#5B5B5B',
		fontSize:30,
		fontWeight:"bold"
	},
	logoView:{
		paddingTop:80,
		paddingBottom:40,
		justifyContent:"center",
		alignItems:"center"
	},
	loading:{
		padding:20
	}

})