import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "../Popup/index";

class FormAddNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        firstname: "",
        lastName: "",
        phone: ""
      },
      errorContact: {
        errorFirstname: "",
        errorLastName: "",
        errorPhone: ""
      },
      boolContact: {
        boolFirst: false,
        boolLast: false,
        boolPhone: false
      },
      message: "",
    };
  }

  handleFirstnameChange = e => {
    // regex to check the input format of the user line 37, line 62 and line 87
    const { contact, errorContact, boolContact } = this.state;
    this.setState({ contact: { ...contact, firstname: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorFirstname: "Veuillez renseigner votre prénom"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolFirst: false } });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorFirstname: "Veuillez rentrer un prénom valide"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolFirst: false } });
    } else {
      this.setState({ errorContact: { ...errorContact, errorFirstname: "" } });
      this.setState({ boolContact: { ...boolContact, boolFirst: true } });
    }
  };

  handleLastNameChange = e => {
    const { contact, errorContact, boolContact } = this.state;
    this.setState({ contact: { ...contact, lastName: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorLastName: "Veuillez renseigner votre nom de famille"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolLast: false } });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorLastName: "Veuillez rentrer un nom valide"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolLast: false } });
    } else {
      this.setState({ errorContact: { ...errorContact, errorLastName: "" } });
      this.setState({ boolContact: { ...boolContact, boolLast: true } });
    }
  };

  handleTelNumberChange = e => {
    const { contact, errorContact, boolContact } = this.state;
    this.setState({ contact: { ...contact, phone: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorPhone: "Veuillez renseigner votre numéro de téléphone"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolPhone: false } });
    } else if (
      !/^((\+)[0-9]{2,3}[ ][0-9]{2}[ ])[1-9]{6,}$/gi.test(e.target.value)
    ) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorPhone: "Veuillez respecter le format. Ex: +39 02 xxxxxxx"
        }
      });
      this.setState({ boolContact: { ...boolContact, boolPhone: false } });
    } else {
      this.setState({ errorContact: { ...errorContact, errorPhone: "" } });
      this.setState({ boolContact: { ...boolContact, boolPhone: true } });
    }
  };

  handleSubmit = () => {
    fetch("/api/add-new-contact", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        contact: this.state.contact
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({ message: "Votre contact a bien été enregistré" });
        this.setState({ isOpen: true });
      } else if (res.status === 500) {
        this.setState({
          message: "Nous avons rencontré un problème lors de la sauvegarde."
        });
        this.setState({ isOpen: true });
      }
    });
  };
  render() {
    const { errorContact } = this.state;
    // variable to store a boolean depending on the condition. The value of the response must be false to make the button clickable
    const buttonBool =
      this.state.boolContact.boolFirst === true &&
      this.state.boolContact.boolLast === true &&
      this.state.boolContact.boolPhone === true;
    return (
      <div>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Firstname"
              onChange={e => this.handleFirstnameChange(e)}
            />
            {errorContact.errorFirstname}
          </li>
          <li>
            <input
              type="text"
              placeholder="Last name"
              onChange={e => this.handleLastNameChange(e)}
            />
            {errorContact.errorLastName}
          </li>
          <li>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={e => this.handleTelNumberChange(e)}
            />
            {errorContact.errorPhone}
          </li>
          <Popup
            nameOpenPopupBtn="Save"
            handleSubmitFetch={() => this.handleSubmit()}
            messageFetch={this.state.message}
            disabled={!buttonBool}
          />
        </ul>
      </div>
    );
  }
}

export default withRouter(FormAddNumber);
