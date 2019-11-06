import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormUpdateNumber extends Component {
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
      }
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

  handleSubmit = id => {
    fetch("/api/edit-contact", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        contact_id: id,
        contact: contact
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
    const { errorContact } = this.state;
    return (
      <div>
        {contacts.map((person, index) => {
          const id = Number(props.match.params.id);
          if (person.contact_id === id) {
            return (
              <ul key={index || person.contact_id}>
                <li>
                  <input
                    type="tel"
                    placeholder={person.firstname}
                    onChange={e => handleFirstnameChange(e)}
                  />
                  {errorContact.errorFirstname}
                </li>
                <li>
                  <input
                    type="text"
                    placeholder={person.last_name}
                    onChange={e => handleLastNameChange(e)}
                  />
                  {errorContact.errorLastName}
                </li>
                <li>
                  <input
                    type="tel"
                    placeholder={person.phone}
                    onChange={e => handleTelNumberChange(e)}
                  />
                  {errorContact.errorPhone}
                </li>
                <button onClick={() => handleSubmit(person.contact_id)}>
                  Click
                </button>
              </ul>
            );
          }
        })}
      </div>
    );
  }
}

export default withRouter(FormUpdateNumber);
