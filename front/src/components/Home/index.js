import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveContacts } from "../../actions/contacts.action";
import "./index.css";

class Home extends Component {
  // to initialize state
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: []
    };
  }

  // the async function await to get a answer, after the execution of the fetch method, before to continue 
  getData = async () => {
    const response = await fetch("/api/contacts");
    const data = await response.json();
    this.setState({ data: data });
    // to dispatch the data by the action 
    this.props.saveContacts(data);
  };

  // instantiate the network request with the function getData after the component is mounted
  componentDidMount() {
    this.getData();
  }

  // to make case insensitive with a string entrance
  searchContact = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  render() {
    // Destructuring the object this.state
    const { data, search } = this.state;

    // Line 53-62: with the function filter I compare the entrance value (name or number) with name or number value in the database
    // Line 64-76: with the function map I create a return of elements that I have to display according to a unique key
    return (
      <div className="container-home">
        <NavLink className="link-add" to="/add-new-contact">
          {" "}
          => Add new phone number
        </NavLink>
        <div className="home-input-search">
          <input
            type="text"
            className="search"
            placeholder="Search"
            onChange={e => this.searchContact(e)}
          />
        </div>
        <table className="table">
          <thead className="table-head">
            <tr className="table-tr">
              <th>Name</th>
              <th>Phone number</th>
              <td>Update</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {search === "" ? <tr></tr> : data
              .filter(select => {
                let name = `${select.last_name} ${select.firstname}`;
                return (
                  select.phone.includes(search) ||
                  (name.toLowerCase().includes(search) ||
                    search === undefined ||
                    search === "all")
                );
              })
              .map((person, index) => (
                <tr key={person.contact_id}>
                  <td>{`${person.last_name} ${person.firstname}`}</td>
                  <td>{person.phone}</td>
                  <td>
                    <NavLink
                      className="link"
                      to={`/update-contact/${person.contact_id}`}
                    >
                      Click
                    </NavLink>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // to distribute the action in the store and the reducers
  return bindActionCreators({ saveContacts }, dispatch);
};

//  withRouter() Access to the component Home and can direct the user to the path indicated in the NavLink
// connect(): to connect the component to the store
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Home)
);
