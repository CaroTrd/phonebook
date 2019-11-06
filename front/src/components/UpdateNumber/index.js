import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "../Popup/index";

class FormUpdateNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: this.props.contacts,
      contact: {
        firstname: "",
        lastName: "",
        phone: "",
        id: 0
      },
      errorContact: {
        errorFirstname: "",
        errorLastName: "",
        errorPhone: ""
      },
      message: ""
    };
  }

  handleFirstnameChange = (e, id) => {
    // regex to check the input format of the user line 37, line 62 and line 87
    const { contact, errorContact } = this.state;
    this.setState({
      contact: { ...contact, firstname: e.target.value, id: id }
    });
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

  handleLastNameChange = (e, id) => {
    const { contact, errorContact } = this.state;
    this.setState({
      contact: { ...contact, lastName: e.target.value, id: id }
    });
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

  handleTelNumberChange = (e, id) => {
    const { contact, errorContact } = this.state;
    this.setState({ contact: { ...contact, phone: e.target.value, id: id } });
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

  handleSubmit = () => {
    fetch("/api/edit-contact", {
      method: "PUT",
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
    const { dataContact, errorContact } = this.state;
    const id = Number(this.props.match.params.id);
    // filter the id taked in the url with the contact_id of the data to return the information about the number or name selected
    const displayNumber = dataContact
      .filter(select => {
        return select.contact_id === id;
      })
      .map((person, index) => {
        return (
          <ul key={person.contact_id} className="form-nav">
            <li>
              <input
                type="tel"
                placeholder={person.firstname}
                onChange={e => this.handleFirstnameChange(e, person.contact_id)}
                className="input-form"
              />
              {errorContact.errorFirstname}
            </li>
            <li>
              <input
                type="text"
                placeholder={person.last_name}
                onChange={e => this.handleLastNameChange(e, person.contact_id)}
                className="input-form"
              />
              {errorContact.errorLastName}
            </li>
            <li>
              <input
                type="tel"
                placeholder={person.phone}
                onChange={e => this.handleTelNumberChange(e, person.contact_id)}
                className="input-form"
              />
              {errorContact.errorPhone}
            </li>
          </ul>
        );
      });
    return (
      <div>
        <div className="container-form-link">
          <NavLink className="link-add" to="/">
            {`> Back to the home page`}
          </NavLink>
        </div>
        <nav className="container-form-nav">{displayNumber}</nav>
        <Popup
          nameOpenPopupBtn="Save"
          handleSubmitFetch={() => this.handleSubmit()}
          messageFetch={this.state.message}
        />
      </div>
    );
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
