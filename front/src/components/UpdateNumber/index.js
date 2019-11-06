import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class FormUpdateNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: this.props.contacts,
      contact: {
        firstname: "",
        lastName: "",
        phone: ""
      },
      errorContact: {
        errorFirstname: "",
        errorLastName: "",
        errorPhone: ""
      }
    };
  }

  handleFirstnameChange = e => {
    // regex to check the input format of the user line 37, line 62 and line 87
    const { contact, errorContact } = this.state;
    this.setState({ contact: { ...contact, firstname: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorFirstname: "Veuillez renseigner votre prénom"
        }
      });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorFirstname: "Veuillez rentrer un prénom valide"
        }
      });
    } else {
      this.setState({ errorContact: { ...errorContact, errorFirstname: "" } });
    }
  };

  handleLastNameChange = e => {
    const { contact, errorContact } = this.state;
    this.setState({ contact: { ...contact, lastName: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorLastName: "Veuillez renseigner votre nom de famille"
        }
      });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorLastName: "Veuillez rentrer un nom valide"
        }
      });
    } else {
      this.setState({ errorContact: { ...errorContact, errorLastName: "" } });
    }
  };

  handleTelNumberChange = e => {
    const { contact, errorContact } = this.state;
    this.setState({ contact: { ...contact, phone: e.target.value } });
    if (e.target.value.trim() === "") {
      this.setState({
        errorContact: {
          ...errorContact,
          errorPhone: "Veuillez renseigner votre numéro de téléphone"
        }
      });
    } else if (
      !/^((\+)[0-9]{2,3}[ ][0-9]{2}[ ])[1-9]{6,}$/gi.test(e.target.value)
    ) {
      this.setState({
        errorContact: {
          ...errorContact,
          errorPhone: "Veuillez respecter le format. Ex: +39 02 xxxxxxx"
        }
      });
    } else {
      this.setState({ errorContact: { ...errorContact, errorPhone: "" } });
    }
  };

  handleSubmit = id => {
    fetch("/api/edit-contact", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        contact_id: id,
        contact: this.state.contact
      })
    }).then(res => {
      if (res.status === 200) {
        window.confirm("Votre contact a bien été enregistré");
      } else if (res.status === 500) {
        window.confirm(
          "Nous avons rencontré un problème lors de la sauvegarde."
        );
      }
    });
  };
  render() {
    const { dataContact, errorContact } = this.state;
    const id = Number(this.props.match.params.id);
    // filter the id taked in the url with the contact_id of the data to return the information about the number or name selected
    const displayNumber = dataContact
      .filter(select => {
        return select.contact_id === id;
      })
      .map((person, index) => {
        return (
          <ul key={index || person.contact_id}>
            <li>
              <input
                type="tel"
                placeholder={person.firstname}
                onChange={e => this.handleFirstnameChange(e)}
              />
              {errorContact.errorFirstname}
            </li>
            <li>
              <input
                type="text"
                placeholder={person.last_name}
                onChange={e => this.handleLastNameChange(e)}
              />
              {errorContact.errorLastName}
            </li>
            <li>
              <input
                type="tel"
                placeholder={person.phone}
                onChange={e => this.handleTelNumberChange(e)}
              />
              {errorContact.errorPhone}
            </li>
            <button onClick={() => this.handleSubmit(person.contact_id)}>
              Click
            </button>
          </ul>
        );
      });
    return <div>{displayNumber}</div>;
  }
}

// the value is in this component
const mapStateToProps = state => {
  return {
    contacts: state.contacts
  };
};

export default withRouter(
  connect(
    // to follow the change in the store
    mapStateToProps,
    null
  )(FormUpdateNumber)
);
