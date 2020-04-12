import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Search from "../Search"
import Moment from "react-moment";
import API from "../../utils/API";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

class Employee extends Component {
  state = {
    empData: [],
    empList: [],
    filterList: [],
    currentSort: 'default',
    searchInput: ""
  };

  componentDidMount() {
    API.getEmployees() //("https://randomuser.me/api/?nat=us&results=200")
      .then(res => {
        const empData = res.data.results;
        const empList = empData;
        this.setState({ empData });
        this.setState({ empList });
      })
      .catch(err => console.log(err));
  }

  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort
    });
  };


  handleInputChange = event => {
    this.setState({ searchInput: event.target.value });

    let filterList = this.state.empData.filter(person => {
      //console.log(person.name.first)
      return person.name.first.includes(event.target.value)
        || person.name.last.includes(event.target.value)
        || person.email.includes(event.target.value)
        || person.phone.includes(event.target.value)
        || person.dob.date.includes(event.target.value)
    });
    const empList = filterList;
    this.setState({ empList });
  }

  render() {
    const { currentSort } = this.state;
    const sortTypes = {
      up: {
        class: 'sort-up',
        fn: (a, b) => a.name.first > (b.name.first) ? 1 : -1
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => a.name.first < (b.name.first) ? 1 : -1
      },
      default: {
        class: 'Sort',
        fn: (a, b) => a
      }
    };

    return (

      <div>

        <Search value={this.state.searchInput} handleInputChange={this.handleInputChange} />
        <Table striped bordered hover variant="light" style={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name <button onClick={this.onSortChange} style={{ border: "none" }}>
                <FontAwesomeIcon icon={this.state.currentSort === "default" ? faSort : this.state.currentSort === "up" ? faSortUp : faSortDown} />
              </button>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>

            {
              [...this.state.empList].sort(sortTypes[currentSort].fn).map(data => (
                <tr>
                  <td><img src={data.picture.thumbnail} alt={data.name.first}/></td>
                  <td>{data.name.title}. {data.name.first}, {data.name.last}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td><Moment format="MM-DD-YYYY">{data.dob.date}</Moment></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

    );
  }


}


export default Employee;
