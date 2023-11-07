import React, { Component } from "react";
import axios from "axios";
import './zipsearch.css';

// bootstrap import below is messing up styling on index
//import 'bootstrap/dist/css/bootstrap.min.css';

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
    }

    get initialState() {
        return {
            // variables that we will assign from API
            zipCode: "",
            countryName: "",
            countryab: "",
            places: [],
            // latitude: "",
            // longitude: "",
            // population: "",
            // wages: "",

            // showInfo is used in conditional rendering
            showInfo: false,
        };
    }

    // can be used to reset all variables to initial state
    resetState() {
        this.setState(this.initialState);
    }

    handleChange(event) {
        // changes state of zipCode according to user input
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 6) {
            // when zipcode is not 5 numbers long, check if we are displaying any information
            // if we are displaying, stop it by setting conditional rendering variable to false
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
        } 
        else {    
            // when zipCode input is 5 characters, run the request
            axios.get("https://api.zippopotam.us/in/" + this.state.zipCode).then((response) => {
                console.log("hello");
                const data = response.data;

                console.log(data);

                // object to hold all the new assignments from API
                const newZipSearchObj = {
                    countryName: data.country,
                    countryab:data.country_abbreviation,
                    places:data.places,
                    showInfo: true,
                };

                // changing state of variables according to API data
                this.setState(newZipSearchObj);
                console.log(this.state.places);
            }).catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <>
                <div>
                </div>

                {/* User input box for zipcode. Each entry triggers a state change */}
                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="10310"
                    onChange={this.handleChange.bind(this)}
                />

                <div className="locationInfo_container">
                    {/* if axios got the data then the information will be displayed, otherwise hide the li info */}
                    {this.state.showInfo ?
                        <div className="locationInfo">
                            <h1>Country: {this.state.countryName}</h1>

                            <ul>

                               
                                <li>Places : </li>
                                <div class="cardCon">
                                    {this.state.places.map((data)=>{

                                         return (
                                            <article class="clickable-card">
                                         <h5 style={{"color":"mediumslateblue","display":"flex"}}>
                                            Place Name : <h5 style={{"color":"white"}}>{data["place name"]}</h5>
                                         </h5>
                                         <p style={{"color":"mediumslateblue","display":"flex"}}>
                                            Longitude :  <p style={{"color":"white"}}>{data["longitude"]}</p>
                                         </p>
                                         <p style={{"color":"mediumslateblue","display":"flex"}}>
                                            state : <p style={{"color":"white"}}>{data["state"]}</p>
                                         </p>
                                         <p style={{"color":"mediumslateblue","display":"flex"}}>
                                            State abbreviation : <p style={{"color":"white"}}> {data["state abbreviation"]}</p>
                                         </p>
                                         <p style={{"color":"mediumslateblue","display":"flex"}}>
                                            Latitude : <p style={{"color":"white"}}> {data["latitude"]}</p>
                                         </p>
                                     </article>
                                         );
 
                                    })}
                                   
                                    </div>
                            </ul>

                        </div>
                        // axios get condition was not met yet
                        : <p className="p_info">Current zipcode is providing no information</p>
                    }
                </div>

            </>
        );
    }
}

export default ZipSearch;