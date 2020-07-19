import React from 'react';
import logo from './logo.svg';
import jwt from 'jsonwebtoken';
import './App.css';
import axios from 'axios';
import {Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, Navbar} from 'reactstrap'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      jobPostings: [],
      token: sessionStorage.getItem('token'),
      username: sessionStorage.getItem('user'), 
      password: null,
      name: null,
      skills: null,
      wage: null, 
      location: null,
      submitted: null,
 
     
     
    }
    this.getJobs = this.getJobs.bind(this)
    this.renderJobs = this.renderJobs.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.logIn = this.logIn.bind(this)
    this.ApplyJob = this.ApplyJob.bind(this)
    this.sendApplication = this.sendApplication.bind(this)
    this.getApplicants = this.getApplicants.bind(this)
  }

  async logIn(){
    sessionStorage.setItem('user', this.state.username)
    let response = await axios.post('/token-auth', {
      "username": this.state.username,
      "password": this.state.password
    })
    sessionStorage.setItem('token', response.data.token)
    
    this.setState({token: response.data.token, username: sessionStorage.getItem('user')}, function() {this.getJobs()})
  }

  async getJobs() {
    
    let response = await axios.get('api/postings/', {headers: {Authorization: `JWT ${this.state.token}`}, params: {'user': this.state.username}})
  
    this.setState({jobPostings: response.data})
  }

  async sendApplication(jobId) {
    let response = await axios.post('api/applications/', {
      'user': this.state.username,
      'applicant_name': this.state.name,
      'applicant_skills': this.state.skills,
      "applicant_wage": this.state.wage,
      "location": this.state.location,
      "Job": jobId
    })
    this.setState({submitted: true})
    
  }

  ApplyJob(id) {
    this.setState({submitted: false, id: id})
    
  }

 

  renderJobs() {
    
 return this.state.jobPostings.map(job => <tr><td>{job.title}</td><td>{job.description}</td><td>{job.location}</td>
 <td><Button color="success" onClick={this.ApplyJob.bind(this, job.id)}>Apply</Button></td>
 </tr>)
  }

  componentDidMount() {
    this.getJobs()
   
  }

  handleChange(event){
    if(event.target.id=="username")
    {
        this.setState({username: event.target.value})
    }
    if (event.target.id=="password")
    {
        this.setState({password: event.target.value})
    }
    if (event.target.id=="name")
    {
        this.setState({name: event.target.value})
    }
    if (event.target.id=="skills")
    {
        this.setState({skills: event.target.value})
    }
    if (event.target.id=="wage")
    {
        this.setState({wage: event.target.value})
    }
    if (event.target.id=="location")
    {
        this.setState({location: event.target.value})
    }
}


  render(){
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
          <Navbar color="light"><h1>WorkMe</h1></Navbar>
        <Container>
        <Modal isOpen={this.state.token==null}>
        <ModalHeader>Please log in:</ModalHeader>
        <ModalBody>
          <Form>
            <Label for="username">Username</Label>
            <Input onChange={this.handleChange} id="username" type="text"></Input>
            <Label for="password">Password</Label>
            <Input onChange={this.handleChange} id="password" type="password"></Input>
          </Form>
        </ModalBody>
        <ModalFooter><Button color="success" onClick={this.logIn}>Log In</Button></ModalFooter>
        </Modal>

        <Modal isOpen={this.state.submitted==false}>
          <ModalHeader>Submit your application</ModalHeader>
          <ModalBody>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" onChange={this.handleChange}></Input>
            <Label for="skills">Send a message to your employers, talk about your skills!</Label>
            <Input type="textarea" id="skills" onChange={this.handleChange}></Input>
            <Label for="wage">Enter your wage expectation for the entire job:</Label>
            <Input type="number" id="wage" onChange={this.handleChange}></Input>
            <Label for="location">Where are you located? Enter the nearest town, province and country:</Label>
            <Input type="text" id="location" onChange={this.handleChange}></Input>
          </ModalBody>
          <ModalFooter><Button color="success" onClick={this.sendApplication.bind(this, this.state.id)}>Submit Application</Button></ModalFooter>
        </Modal>
}
        <Table>
          <thead>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
          </thead>
          {this.renderJobs()}
        </Table>
      </Container>
        </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;
