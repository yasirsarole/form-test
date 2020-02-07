import React from "react";
import axios from "axios";
import Select from "react-select";

const domainOptions = [
  { value: "it", label: "Information Technology" },
  { value: "domain1", label: "Domain 1" },
  { value: "domain2", label: "Domain 2" },
  { value: "domain3", label: "Domain 3" },
  { value: "domain4", label: "Domain 4" },
  { value: "domain5", label: "Domain 5" },
  { value: "domain6", label: "Domain 6" },
  { value: "domain7", label: "Domain 7" },
  { value: "domain8", label: "Domain 8" }
];

const subDomainOptions = [
  { value: "subdomain1", label: "subDomain 1" },
  { value: "subdomain2", label: "subDomain 2" },
  { value: "subdomain3", label: "subDomain 3" },
  { value: "subdomain4", label: "subDomain 4" },
  { value: "subdomain5", label: "subDomain 5" },
  { value: "subdomain6", label: "subDomain 6" },
  { value: "subdomain7", label: "subDomain 7" },
  { value: "subdomain8", label: "subDomain 8" }
];

class App extends React.Component {
  state = {
    formValues: {
      first_name: "",
      last_name: "",
      sex: null,
      domain: null,
      subDomain: null
    }
  };

  // create user when the form is submitted
  createUser = body => {
    const url =
      "https://b7j5zirytf.execute-api.ap-south-1.amazonaws.com/prod/candidate-profile";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };

    // post request to create user
    axios
      .post(url, JSON.stringify(body), {
        headers: headers
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleSelectChange = (type, value) => {
    const { formValues } = JSON.parse(JSON.stringify(this.state));

    formValues[type] = value;

    this.setState({
      formValues
    });
  };

  // create body on form submit
  onFormSubmit = e => {
    e.preventDefault();

    const { formValues } = JSON.parse(JSON.stringify(this.state));
    const { first_name, last_name, sex, domain, subDomain } = formValues;

    const body = {
      user_id: 13,
      user_name: "pranali",
      personal_details: {
        id: "",
        title: "",
        first_name,
        last_name,
        sex: sex.label,
        domain: domain.label,
        subdomains: [
          ...subDomain.map(sub => {
            return {
              name: sub.label
            };
          })
        ]
      },
      educational_details: null,
      experience_details: null,
      certificates: null,
      awards: null,
      patents: null,
      softskills: null,
      external_links: null
    };

    this.createUser(body);
  };

  // manage input values
  manageInputValues = (type, value) => {
    const { formValues } = JSON.parse(JSON.stringify(this.state));

    formValues[type] = value;

    this.setState({
      formValues
    });
  };

  render() {
    return (
      <>
        <div className="formContainer">
          <h2>Personal Details</h2>
          <form onSubmit={e => this.onFormSubmit(e)}>
            <div className="nameContainer">
              <span>Your Name</span>
              <div className="fieldContainer">
                <input
                  onInput={e =>
                    this.manageInputValues("first_name", e.target.value)
                  }
                  placeholder="First Name"
                  type="text"
                  id="first_name"
                />
              </div>
              <div className="fieldContainer">
                <input
                  onInput={e =>
                    this.manageInputValues("last_name", e.target.value)
                  }
                  placeholder="Last Name"
                  type="text"
                  id="last_name"
                />
              </div>
              <div className="sexContainer">
                <span>Sex</span>
                <div className="sexSelectParent">
                  <Select
                    value={this.state.sex}
                    onChange={selectedOption =>
                      this.handleSelectChange("sex", selectedOption)
                    }
                    options={[
                      { value: "male", label: "Male" },
                      { value: "Female", label: "Female" }
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="domainContainer">
              <span>Your Professional domain</span>
              <div className="domainSelectParent">
                <Select
                  value={this.state.domain}
                  onChange={selectedOption =>
                    this.handleSelectChange("domain", selectedOption)
                  }
                  options={domainOptions}
                />
              </div>
            </div>
            <div className="subDomainContainer">
              <span>Sub domain</span>
              <div className="subDomainSelectParent">
                <Select
                  value={this.state.subDomain}
                  onChange={selectedOption =>
                    this.handleSelectChange("subDomain", selectedOption)
                  }
                  options={subDomainOptions}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="submitContainer">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default App;
